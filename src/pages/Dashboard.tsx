import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  BarChart3, 
  TrendingUp, 
  Globe, 
  Thermometer, 
  Droplets,
  Download,
  Filter,
  RefreshCw
} from "lucide-react";

// Mock visualization components
const TemperatureChart = () => (
  <div className="h-64 bg-gradient-surface rounded-lg flex items-center justify-center border">
    <div className="text-center space-y-2">
      <Thermometer className="h-12 w-12 text-accent mx-auto" />
      <p className="text-sm font-medium">Temperature vs Depth Profile</p>
      <p className="text-xs text-muted-foreground">Interactive scatter plot would render here</p>
    </div>
  </div>
);

const SalinityChart = () => (
  <div className="h-64 bg-gradient-surface rounded-lg flex items-center justify-center border">
    <div className="text-center space-y-2">
      <Droplets className="h-12 w-12 text-accent mx-auto" />
      <p className="text-sm font-medium">Temperature-Salinity Diagram</p>
      <p className="text-xs text-muted-foreground">T-S diagram would render here</p>
    </div>
  </div>
);

const GeographicMap = () => (
  <div className="h-80 bg-gradient-surface rounded-lg flex items-center justify-center border">
    <div className="text-center space-y-2">
      <Globe className="h-16 w-16 text-accent mx-auto" />
      <p className="text-sm font-medium">ARGO Float Trajectories</p>
      <p className="text-xs text-muted-foreground">Interactive map with float positions would render here</p>
      <Badge variant="outline" className="text-xs">Mapbox Integration</Badge>
    </div>
  </div>
);

const StatisticsGrid = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    <Card>
      <CardContent className="p-4">
        <div className="text-2xl font-bold text-accent">2,487</div>
        <p className="text-xs text-muted-foreground">Active Floats</p>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="p-4">
        <div className="text-2xl font-bold text-primary">15.2°C</div>
        <p className="text-xs text-muted-foreground">Avg Temperature</p>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="p-4">
        <div className="text-2xl font-bold text-success">34.7 PSU</div>
        <p className="text-xs text-muted-foreground">Avg Salinity</p>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="p-4">
        <div className="text-2xl font-bold text-warning">1,247m</div>
        <p className="text-xs text-muted-foreground">Avg Depth</p>
      </CardContent>
    </Card>
  </div>
);

export default function Dashboard() {
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [depthRange, setDepthRange] = useState({ min: '', max: '' });
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Oceanographic Dashboard</h1>
          <p className="text-muted-foreground">
            Visualize and analyze oceanographic data from ARGO floats and research sensors
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
          <Button size="sm" className="bg-accent hover:bg-accent-hover">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Statistics Overview */}
      <StatisticsGrid />

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Data Filters
          </CardTitle>
          <CardDescription>
            Filter visualizations by region, depth, time range, and other parameters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="region">Ocean Region</Label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="atlantic">North Atlantic</SelectItem>
                  <SelectItem value="pacific">Pacific</SelectItem>
                  <SelectItem value="indian">Indian Ocean</SelectItem>
                  <SelectItem value="arctic">Arctic</SelectItem>
                  <SelectItem value="southern">Southern Ocean</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="depth-min">Depth Range (m)</Label>
              <div className="flex gap-2">
                <Input
                  id="depth-min"
                  placeholder="Min"
                  value={depthRange.min}
                  onChange={(e) => setDepthRange(prev => ({ ...prev, min: e.target.value }))}
                />
                <Input
                  placeholder="Max"
                  value={depthRange.max}
                  onChange={(e) => setDepthRange(prev => ({ ...prev, max: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date-start">Date Range</Label>
              <div className="flex gap-2">
                <Input
                  id="date-start"
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                />
                <Input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Float ID</Label>
              <Input placeholder="e.g., 1234567" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visualizations */}
      <Tabs defaultValue="profiles" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profiles">Depth Profiles</TabsTrigger>
          <TabsTrigger value="ts-diagram">T-S Diagrams</TabsTrigger>
          <TabsTrigger value="geographic">Geographic</TabsTrigger>
          <TabsTrigger value="time-series">Time Series</TabsTrigger>
        </TabsList>

        <TabsContent value="profiles" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Temperature Profile
                </CardTitle>
                <CardDescription>
                  Temperature measurements across depth levels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TemperatureChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Salinity Distribution
                </CardTitle>
                <CardDescription>
                  Salinity values by depth and location
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-surface rounded-lg flex items-center justify-center border">
                  <div className="text-center space-y-2">
                    <BarChart3 className="h-12 w-12 text-accent mx-auto" />
                    <p className="text-sm font-medium">Salinity Histogram</p>
                    <p className="text-xs text-muted-foreground">Distribution chart would render here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ts-diagram" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Temperature-Salinity Diagram</CardTitle>
              <CardDescription>
                Classical T-S diagram showing water mass characteristics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SalinityChart />
              <div className="mt-4 flex gap-4">
                <Badge variant="outline">Antarctic Bottom Water</Badge>
                <Badge variant="outline">North Atlantic Deep Water</Badge>
                <Badge variant="outline">Mediterranean Water</Badge>
                <Badge variant="outline">Surface Water</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geographic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                ARGO Float Trajectories
              </CardTitle>
              <CardDescription>
                Geographic distribution and movement patterns of oceanographic instruments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GeographicMap />
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <span>Active Floats</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-warning rounded-full"></div>
                  <span>Recent Data</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span>High Quality</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
                  <span>Historical</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="time-series" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Time Series Analysis</CardTitle>
              <CardDescription>
                Temporal patterns and trends in oceanographic measurements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-surface rounded-lg flex items-center justify-center border">
                <div className="text-center space-y-2">
                  <TrendingUp className="h-12 w-12 text-accent mx-auto" />
                  <p className="text-sm font-medium">Multi-parameter Time Series</p>
                  <p className="text-xs text-muted-foreground">Temporal analysis charts would render here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}