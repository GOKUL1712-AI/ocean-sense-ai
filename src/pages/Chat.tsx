import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Send, Bot, User, FileText, Waves, Brain } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: string[];
}

const sampleMessages: Message[] = [
  {
    id: '1',
    type: 'assistant',
    content: 'Hello! I\'m OceanGPT, your oceanographic AI assistant. I can help you analyze ocean data, answer questions about marine science, and generate visualizations from ARGO float data. What would you like to explore today?',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
  }
];

const quickQueries = [
  "Show temperature profiles for the North Atlantic",
  "What is the salinity range in the Pacific Ocean?",
  "Generate a T-S diagram for recent ARGO data",
  "Explain ocean acidification trends",
  "Compare temperature data across different depths"
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `I understand you're asking about "${inputValue}". This is a simulated response from OceanGPT. In the real system, I would query the RAG pipeline to search oceanographic literature, retrieve relevant ARGO float data from PostgreSQL, and provide scientifically accurate information with proper citations and data visualizations.`,
        timestamp: new Date(),
        sources: ['ARGO Float Dataset #12345', 'Ocean Temperature Atlas 2023', 'Marine Biology Research Paper #67890']
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
      toast({
        title: "Query Processed",
        description: "OceanGPT has analyzed your request and provided a response.",
      });
    }, 1500);
  };

  const handleQuickQuery = (query: string) => {
    setInputValue(query);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background">
      {/* Chat Interface */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-6 border-b bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-ocean rounded-lg">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">OceanGPT Chat</h2>
                <p className="text-sm text-muted-foreground">Ask questions about oceanographic data</p>
              </div>
            </div>
            <Badge className="bg-accent/20 text-accent">Online</Badge>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
          <div className="space-y-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : ''}`}>
                {message.type === 'assistant' && (
                  <div className="p-2 bg-gradient-ocean rounded-full">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                
                <div className={`max-w-2xl ${message.type === 'user' ? 'order-1' : ''}`}>
                  <Card className={`${message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-card'}`}>
                    <CardContent className="p-4">
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      
                      {message.sources && (
                        <div className="mt-3 pt-3 border-t border-border/50">
                          <p className="text-xs text-muted-foreground mb-2">Sources:</p>
                          <div className="flex flex-wrap gap-2">
                            {message.sources.map((source, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                <FileText className="h-3 w-3 mr-1" />
                                {source}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <p className="text-xs text-muted-foreground mt-1 px-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>

                {message.type === 'user' && (
                  <div className="p-2 bg-accent rounded-full">
                    <User className="h-4 w-4 text-accent-foreground" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3">
                <div className="p-2 bg-gradient-ocean rounded-full">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <Card className="bg-card">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Waves className="h-4 w-4 text-accent animate-wave" />
                      <span className="text-sm text-muted-foreground">OceanGPT is thinking...</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-6 border-t bg-card">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about ocean temperature, salinity, ARGO data, or any oceanographic topic..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!inputValue.trim() || isLoading}
              className="bg-accent hover:bg-accent-hover"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Queries Sidebar */}
      <div className="w-80 border-l bg-gradient-foam p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Queries</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {quickQueries.map((query, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start text-left h-auto p-3 hover:bg-muted/50"
                onClick={() => handleQuickQuery(query)}
              >
                <span className="text-sm">{query}</span>
              </Button>
            ))}
          </CardContent>
        </Card>

        <Separator className="my-6" />

        <Card>
          <CardHeader>
            <CardTitle className="text-base">System Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Model</span>
              <span>OceanGPT v2.1</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Vector DB</span>
              <Badge variant="outline" className="text-xs">FAISS</Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Data Sources</span>
              <span>1,247 files</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Response Time</span>
              <span className="text-accent">~1.2s</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}