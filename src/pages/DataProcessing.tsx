import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Upload, 
  FileText, 
  Database, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Download,
  Trash2,
  Eye
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ProcessingJob {
  id: string;
  filename: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  size: string;
  startTime?: Date;
  endTime?: Date;
  recordsProcessed?: number;
  errorMessage?: string;
}

const sampleJobs: ProcessingJob[] = [
  {
    id: '1',
    filename: 'ARGO_2024_001_temperature.nc',
    status: 'completed',
    progress: 100,
    size: '45.2 MB',
    startTime: new Date(Date.now() - 10 * 60 * 1000),
    endTime: new Date(Date.now() - 8 * 60 * 1000),
    recordsProcessed: 12543
  },
  {
    id: '2',
    filename: 'biogeochemical_sensors_pacific.nc',
    status: 'processing',
    progress: 67,
    size: '128.7 MB',
    startTime: new Date(Date.now() - 3 * 60 * 1000),
    recordsProcessed: 8721
  },
  {
    id: '3',
    filename: 'salinity_data_atlantic_2024.nc',
    status: 'pending',
    progress: 0,
    size: '89.1 MB'
  }
];

export default function DataProcessing() {
  const [jobs, setJobs] = useState<ProcessingJob[]>(sampleJobs);
  const [filePath, setFilePath] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async () => {
    if (!filePath.trim()) {
      toast({
        title: "Error",
        description: "Please specify a file path",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    // Simulate file upload and processing
    const newJob: ProcessingJob = {
      id: Date.now().toString(),
      filename: filePath.split('/').pop() || filePath,
      status: 'pending',
      progress: 0,
      size: '156.3 MB'
    };

    setJobs(prev => [newJob, ...prev]);
    setFilePath('');

    // Simulate processing start
    setTimeout(() => {
      setJobs(prev => prev.map(job => 
        job.id === newJob.id 
          ? { ...job, status: 'processing', startTime: new Date() }
          : job
      ));

      // Simulate progress updates
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        
        setJobs(prev => prev.map(job => 
          job.id === newJob.id 
            ? { 
                ...job, 
                progress: Math.min(progress, 100),
                recordsProcessed: Math.floor((progress * 15000) / 100)
              }
            : job
        ));

        if (progress >= 100) {
          clearInterval(progressInterval);
          setJobs(prev => prev.map(job => 
            job.id === newJob.id 
              ? { 
                  ...job, 
                  status: 'completed', 
                  progress: 100,
                  endTime: new Date(),
                  recordsProcessed: 15000
                }
              : job
          ));
          
          toast({
            title: "Processing Complete",
            description: `Successfully processed ${newJob.filename}`,
          });
        }
      }, 500);
    }, 1000);

    setIsUploading(false);
  };

  const getStatusIcon = (status: ProcessingJob['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'processing':
        return <Loader2 className="h-4 w-4 text-accent animate-spin" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: ProcessingJob['status']) => {
    const statusMap = {
      pending: { variant: 'secondary' as const, label: 'Pending' },
      processing: { variant: 'default' as const, label: 'Processing' },
      completed: { variant: 'default' as const, label: 'Completed' },
      error: { variant: 'destructive' as const, label: 'Error' }
    };

    const config = statusMap[status];
    return (
      <Badge 
        variant={config.variant} 
        className={status === 'completed' ? 'bg-success/20 text-success' : ''}
      >
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Data Processing</h1>
        <p className="text-muted-foreground">
          Upload and process NetCDF oceanographic files for ingestion into the PostgreSQL database.
        </p>
      </div>

      <Tabs defaultValue="upload" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">File Upload</TabsTrigger>
          <TabsTrigger value="jobs">Processing Jobs</TabsTrigger>
          <TabsTrigger value="logs">System Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload NetCDF Files
              </CardTitle>
              <CardDescription>
                Specify file paths or upload NetCDF files containing oceanographic data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="filepath">File Path</Label>
                <Input
                  id="filepath"
                  value={filePath}
                  onChange={(e) => setFilePath(e.target.value)}
                  placeholder="/data/ocean/ARGO_2024_temperature.nc"
                  className="font-mono text-sm"
                />
              </div>

              <Button 
                onClick={handleFileUpload}
                disabled={isUploading || !filePath.trim()}
                className="bg-accent hover:bg-accent-hover"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Database className="h-4 w-4 mr-2" />
                    Start Processing
                  </>
                )}
              </Button>

              {/* Upload Info */}
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Supported formats: NetCDF (.nc), HDF5 (.h5). Files will be validated and processed into structured PostgreSQL tables.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* System Statistics */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Files Processed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">1,247</div>
                <p className="text-xs text-success">+23 this week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Data Records</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">2.4M</div>
                <p className="text-xs text-accent">Ocean measurements</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Storage Used</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">156 GB</div>
                <p className="text-xs text-muted-foreground">PostgreSQL database</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-6">
          {/* Processing Jobs */}
          <Card>
            <CardHeader>
              <CardTitle>Processing Queue</CardTitle>
              <CardDescription>
                Monitor the status of file processing and data ingestion jobs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div key={job.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(job.status)}
                        <div>
                          <p className="font-medium text-sm">{job.filename}</p>
                          <p className="text-xs text-muted-foreground">{job.size}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {getStatusBadge(job.status)}
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {job.status === 'processing' && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span>{Math.round(job.progress)}%</span>
                        </div>
                        <Progress value={job.progress} className="w-full" />
                        {job.recordsProcessed && (
                          <p className="text-xs text-muted-foreground">
                            {job.recordsProcessed.toLocaleString()} records processed
                          </p>
                        )}
                      </div>
                    )}

                    {job.status === 'completed' && job.recordsProcessed && (
                      <div className="text-sm text-muted-foreground">
                        <span className="text-success">{job.recordsProcessed.toLocaleString()} records</span> processed in{' '}
                        {job.startTime && job.endTime && (
                          <span>{Math.round((job.endTime.getTime() - job.startTime.getTime()) / 1000)}s</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          {/* System Logs */}
          <Card>
            <CardHeader>
              <CardTitle>Processing Logs</CardTitle>
              <CardDescription>
                View detailed logs from the data processing pipeline
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                className="min-h-[400px] font-mono text-xs bg-muted/50"
                value={`[2024-01-15 14:23:45] INFO: Starting NetCDF file validation...
[2024-01-15 14:23:46] INFO: File structure validated successfully
[2024-01-15 14:23:47] INFO: Extracting temperature data arrays...
[2024-01-15 14:23:52] INFO: Processing 12,543 temperature measurements
[2024-01-15 14:23:55] INFO: Validating data ranges and quality flags...
[2024-01-15 14:24:02] INFO: Inserting records into PostgreSQL database...
[2024-01-15 14:24:18] SUCCESS: File processing completed
[2024-01-15 14:24:18] INFO: Database index optimization complete
[2024-01-15 14:24:19] INFO: Vector embeddings generated for FAISS
[2024-01-15 14:24:20] INFO: Processing pipeline finished successfully`}
                readOnly
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}