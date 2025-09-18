import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Calendar, 
  Clock, 
  MessageSquare, 
  Star, 
  Download, 
  Trash2,
  Filter,
  RotateCcw
} from "lucide-react";

interface QueryHistoryItem {
  id: string;
  query: string;
  response: string;
  timestamp: Date;
  duration: number; // in seconds
  sources: string[];
  starred: boolean;
  category: 'temperature' | 'salinity' | 'depth' | 'visualization' | 'general';
}

const sampleHistory: QueryHistoryItem[] = [
  {
    id: '1',
    query: 'Show temperature profiles for the North Atlantic Ocean',
    response: 'Based on recent ARGO float data from the North Atlantic, I found temperature profiles showing typical seasonal thermocline patterns...',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    duration: 1.2,
    sources: ['ARGO Float #4902567', 'Temperature Atlas 2024', 'North Atlantic Dataset'],
    starred: true,
    category: 'temperature'
  },
  {
    id: '2',
    query: 'What is the average salinity in the Pacific at 1000m depth?',
    response: 'The average salinity at 1000m depth in the Pacific Ocean is approximately 34.5 PSU, with regional variations...',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    duration: 0.8,
    sources: ['Pacific Salinity Database', 'ARGO Float Network'],
    starred: false,
    category: 'salinity'
  },
  {
    id: '3',
    query: 'Generate a T-S diagram for recent data',
    response: 'I\'ve generated a Temperature-Salinity diagram using the most recent oceanographic measurements...',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    duration: 2.1,
    sources: ['Recent ARGO Data', 'Biogeochemical Sensors', 'Quality Control Dataset'],
    starred: true,
    category: 'visualization'
  },
  {
    id: '4',
    query: 'Explain ocean acidification trends in the last decade',
    response: 'Ocean acidification has continued to increase over the past decade, with pH levels decreasing by approximately...',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    duration: 1.5,
    sources: ['Ocean Chemistry Reports', 'pH Monitoring Network', 'Climate Research Papers'],
    starred: false,
    category: 'general'
  },
  {
    id: '5',
    query: 'Compare temperature data between 500m and 1500m depth',
    response: 'The temperature comparison between 500m and 1500m depths shows significant stratification patterns...',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    duration: 1.8,
    sources: ['Depth Profile Database', 'Temperature Measurements', 'Statistical Analysis'],
    starred: false,
    category: 'depth'
  }
];

const categoryColors = {
  temperature: 'bg-red-100 text-red-800',
  salinity: 'bg-blue-100 text-blue-800',
  depth: 'bg-green-100 text-green-800',
  visualization: 'bg-purple-100 text-purple-800',
  general: 'bg-gray-100 text-gray-800'
};

export default function QueryHistory() {
  const [history, setHistory] = useState<QueryHistoryItem[]>(sampleHistory);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredHistory = history.filter(item => {
    const matchesSearch = item.query.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.response.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleStar = (id: string) => {
    setHistory(prev => prev.map(item => 
      item.id === id ? { ...item, starred: !item.starred } : item
    ));
  };

  const getCategoryBadge = (category: string) => (
    <Badge 
      variant="secondary" 
      className={`text-xs ${categoryColors[category as keyof typeof categoryColors]}`}
    >
      {category}
    </Badge>
  );

  const formatDuration = (seconds: number) => `${seconds}s`;

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Less than 1 hour ago';
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Query History</h1>
        <p className="text-muted-foreground">
          Review past queries, save important results, and manage your research sessions
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search queries and responses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant={selectedCategory === 'all' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedCategory('all')}
              >
                All
              </Button>
              <Button 
                variant={selectedCategory === 'temperature' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedCategory('temperature')}
              >
                Temperature
              </Button>
              <Button 
                variant={selectedCategory === 'salinity' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedCategory('salinity')}
              >
                Salinity
              </Button>
              <Button 
                variant={selectedCategory === 'visualization' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedCategory('visualization')}
              >
                Charts
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">{history.length}</div>
            <p className="text-sm text-muted-foreground">Total Queries</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-accent">{history.filter(h => h.starred).length}</div>
            <p className="text-sm text-muted-foreground">Starred Results</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">
              {(history.reduce((sum, h) => sum + h.duration, 0) / history.length).toFixed(1)}s
            </div>
            <p className="text-sm text-muted-foreground">Avg Response Time</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">7</div>
            <p className="text-sm text-muted-foreground">Days Active</p>
          </CardContent>
        </Card>
      </div>

      {/* History List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Recent Queries</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {filteredHistory.map((item, index) => (
                <div key={item.id}>
                  <div className="space-y-3 p-4 hover:bg-muted/50 rounded-lg transition-colors">
                    {/* Query Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          <p className="font-medium text-sm">{item.query}</p>
                        </div>
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatTimestamp(item.timestamp)}
                          </div>
                          <div className="flex items-center gap-1">
                            <RotateCcw className="h-3 w-3" />
                            {formatDuration(item.duration)}
                          </div>
                          {getCategoryBadge(item.category)}
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleStar(item.id)}
                          className={item.starred ? 'text-yellow-500' : 'text-muted-foreground'}
                        >
                          <Star className={`h-4 w-4 ${item.starred ? 'fill-current' : ''}`} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Response Preview */}
                    <div className="pl-6 space-y-2">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.response}
                      </p>
                      
                      {/* Sources */}
                      <div className="flex flex-wrap gap-2">
                        {item.sources.map((source, sourceIndex) => (
                          <Badge key={sourceIndex} variant="outline" className="text-xs">
                            {source}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {index < filteredHistory.length - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}