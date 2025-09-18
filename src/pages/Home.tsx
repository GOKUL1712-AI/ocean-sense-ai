import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Database, MessageSquare, BarChart3, Waves, Zap, Brain, Search } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-ocean.jpg";

const capabilities = [
  {
    icon: Brain,
    title: "Natural Language Queries",
    description: "Ask complex oceanographic questions in plain English and get scientifically accurate responses powered by OceanGPT."
  },
  {
    icon: Search,
    title: "Scientific Knowledge Base",
    description: "Access vast oceanographic literature through RAG pipeline with FAISS vector database for semantic search."
  },
  {
    icon: Database,
    title: "Real Ocean Data",
    description: "Query structured oceanographic data from ARGO floats, biogeochemical sensors, and NetCDF files."
  },
  {
    icon: BarChart3,
    title: "Advanced Visualizations",
    description: "Generate T-S diagrams, depth profiles, geographic trajectories, and interactive scientific plots."
  }
];

const features = [
  "Multi-turn conversation with context awareness",
  "Real-time data processing and ingestion",
  "Interactive oceanographic visualizations",
  "Query history and result management",
  "System health monitoring and logs"
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-deep">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Oceanographic Research Vessel" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 py-24">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Waves className="h-12 w-12 text-accent animate-float" />
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                AI-Powered Oceanography
              </Badge>
            </div>
            
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-accent-foreground bg-clip-text text-transparent">
              Explore Ocean Data with AI Intelligence
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Advanced oceanographic AI assistant combining natural language processing, 
              real-time data analysis, and scientific visualization for marine research.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent-hover text-accent-foreground shadow-deep">
                <Link to="/chat">
                  Start Ocean Query <MessageSquare className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                <Link to="/dashboard">
                  View Visualizations <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Powerful Oceanographic AI Capabilities
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our system combines cutting-edge AI with comprehensive oceanographic data 
              to provide unprecedented insights into marine environments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((capability, index) => (
              <Card key={index} className="group hover:shadow-ocean transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="p-3 bg-gradient-surface rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
                    <capability.icon className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-lg">{capability.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {capability.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-foam">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Complete Oceanographic Research Platform
              </h2>
              <p className="text-muted-foreground mb-8">
                From data ingestion to scientific visualization, our platform provides 
                everything researchers need to analyze and understand ocean data.
              </p>
              
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="p-1 bg-accent/20 rounded-full">
                      <Zap className="h-4 w-4 text-accent" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8">
                <Button asChild className="bg-primary hover:bg-primary-hover">
                  <Link to="/data">
                    Process Ocean Data <Database className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-card rounded-xl shadow-deep p-8 border">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">System Status</span>
                    <Badge className="bg-success/20 text-success">Online</Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">OceanGPT LLM</span>
                      <span className="text-sm text-accent">Active</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Vector Database</span>
                      <span className="text-sm text-accent">Connected</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">PostgreSQL</span>
                      <span className="text-sm text-accent">Ready</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">API Layer</span>
                      <span className="text-sm text-accent">Running</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Data Sources</span>
                      <span className="font-medium">1,247 NetCDF files</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-ocean">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Explore Ocean Intelligence?
            </h2>
            <p className="text-white/90 mb-8">
              Start your oceanographic research journey with AI-powered insights and comprehensive data analysis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link to="/chat">
                  Begin Research <MessageSquare className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                <Link to="/status">
                  System Overview
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}