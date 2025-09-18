import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Activity, 
  Database, 
  Brain, 
  Search, 
  Server, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Zap,
  HardDrive
} from "lucide-react";

interface SystemComponent {
  name: string;
  status: 'online' | 'warning' | 'offline';
  uptime: string;
  responseTime?: string;
  load?: number;
  memory?: number;
  details: string;
}

const systemComponents: SystemComponent[] = [
  {
    name: 'OceanGPT LLM',
    status: 'online',
    uptime: '99.8%',
    responseTime: '1.2s',
    load: 45,
    details: 'Natural language processing model running optimally'
  },
  {
    name: 'FAISS Vector Database',
    status: 'online',
    uptime: '99.9%',
    responseTime: '0.3s',
    load: 28,
    memory: 67,
    details: 'Semantic search index with 1.2M embeddings'
  },
  {
    name: 'PostgreSQL Database',
    status: 'online',
    uptime: '99.7%',
    responseTime: '0.8s',
    load: 32,
    memory: 54,
    details: '2.4M oceanographic records, 156GB data'
  },
  {
    name: 'FastAPI Backend',
    status: 'online',
    uptime: '99.6%',
    responseTime: '0.1s',
    load: 15,
    details: 'REST API serving 847 requests/min'
  },
  {
    name: 'MCP Orchestrator',
    status: 'warning',
    uptime: '98.2%',
    responseTime: '2.1s',
    load: 78,
    details: 'High load detected, monitoring performance'
  },
  {
    name: 'Data Processing Pipeline',
    status: 'online',
    uptime: '97.8%',
    load: 23,
    details: 'Processing 47 NetCDF files in queue'
  }
];

const getStatusIcon = (status: SystemComponent['status']) => {
  switch (status) {
    case 'online':
      return <CheckCircle className="h-4 w-4 text-success" />;
    case 'warning':
      return <AlertTriangle className="h-4 w-4 text-warning" />;
    case 'offline':
      return <AlertTriangle className="h-4 w-4 text-destructive" />;
  }
};

const getStatusBadge = (status: SystemComponent['status']) => {
  switch (status) {
    case 'online':
      return <Badge className="bg-success/20 text-success">Online</Badge>;
    case 'warning':
      return <Badge variant="secondary" className="bg-warning/20 text-warning">Warning</Badge>;
    case 'offline':
      return <Badge variant="destructive">Offline</Badge>;
  }
};

const getLoadColor = (load: number) => {
  if (load < 50) return 'text-success';
  if (load < 80) return 'text-warning';
  return 'text-destructive';
};

export default function SystemStatus() {
  const onlineComponents = systemComponents.filter(c => c.status === 'online').length;
  const warningComponents = systemComponents.filter(c => c.status === 'warning').length;
  const offlineComponents = systemComponents.filter(c => c.status === 'offline').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">System Status</h1>
        <p className="text-muted-foreground">
          Monitor the health and performance of all oceanographic AI system components
        </p>
      </div>

      {/* System Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/20 rounded-lg">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold text-success">{onlineComponents}</div>
                <p className="text-sm text-muted-foreground">Online</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/20 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-warning" />
              </div>
              <div>
                <div className="text-2xl font-bold text-warning">{warningComponents}</div>
                <p className="text-sm text-muted-foreground">Warnings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-destructive/20 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <div className="text-2xl font-bold text-destructive">{offlineComponents}</div>
                <p className="text-sm text-muted-foreground">Offline</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/20 rounded-lg">
                <Activity className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">847</div>
                <p className="text-sm text-muted-foreground">Req/min</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {warningComponents > 0 && (
        <Alert className="border-warning/50 bg-warning/10">
          <AlertTriangle className="h-4 w-4 text-warning" />
          <AlertDescription className="text-warning">
            {warningComponents} component{warningComponents > 1 ? 's' : ''} showing warnings. 
            MCP Orchestrator is experiencing high load and may need optimization.
          </AlertDescription>
        </Alert>
      )}

      {/* Component Status */}
      <Card>
        <CardHeader>
          <CardTitle>Component Health</CardTitle>
          <CardDescription>
            Detailed status and performance metrics for all system components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {systemComponents.map((component, index) => (
              <div key={index} className="space-y-3 p-4 border rounded-lg">
                {/* Component Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(component.status)}
                    <div>
                      <h3 className="font-medium text-sm">{component.name}</h3>
                      <p className="text-xs text-muted-foreground">{component.details}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {component.responseTime && (
                      <div className="text-right">
                        <div className="text-sm font-medium">{component.responseTime}</div>
                        <div className="text-xs text-muted-foreground">Response</div>
                      </div>
                    )}
                    <div className="text-right">
                      <div className="text-sm font-medium">{component.uptime}</div>
                      <div className="text-xs text-muted-foreground">Uptime</div>
                    </div>
                    {getStatusBadge(component.status)}
                  </div>
                </div>

                {/* Performance Metrics */}
                {(component.load !== undefined || component.memory !== undefined) && (
                  <div className="grid grid-cols-2 gap-4">
                    {component.load !== undefined && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">CPU Load</span>
                          <span className={getLoadColor(component.load)}>{component.load}%</span>
                        </div>
                        <Progress value={component.load} className="h-2" />
                      </div>
                    )}
                    
                    {component.memory !== undefined && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Memory</span>
                          <span className={getLoadColor(component.memory)}>{component.memory}%</span>
                        </div>
                        <Progress value={component.memory} className="h-2" />
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              API Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Average Response Time</span>
                <span className="text-sm font-medium">1.2s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Requests per Minute</span>
                <span className="text-sm font-medium">847</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Success Rate</span>
                <span className="text-sm font-medium text-success">99.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Active Sessions</span>
                <span className="text-sm font-medium">23</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-5 w-5" />
              Storage & Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Database Size</span>
                <span className="text-sm font-medium">156 GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Ocean Records</span>
                <span className="text-sm font-medium">2.4M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Vector Embeddings</span>
                <span className="text-sm font-medium">1.2M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Files Processed</span>
                <span className="text-sm font-medium">1,247</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}