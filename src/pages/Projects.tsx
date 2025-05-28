import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Grid2x2, List } from "lucide-react";

const projects = [
	{
		title: "CurrencyRate MCP Server",
		description: "Simple MCP server that provides currency exchange rates.",
		tags: ["MCP", "Typescript"],
		link: "https://github.com/TVSSSRIPAD/CurrencyRate-MCP",
		live: "https://www.youtube.com/watch?v=mme-iBEw7mk",
		date: "05/2025",
	},
	{
		title: "OnlineEd - Virtual Classroom",
		description:
			"A virtual classroom website for intraction between Teachers and Student developed during Covid-19 pandemic.",
		tags: ["React", "Azure CosmosDB", "NodeJs", "Express"],
		link: "https://github.com/TVSSSRIPAD/OnlinEd",
		live: null,
		date: "07/2022",
	},
	{
		title: "UNIMAS - University Management System",
		description:
			"A full-stack spring-boot application built for managing university data as part of DataBaseManagementSystem (DBMS) course at IIT Bhubaneswar.",
		tags: ["Vanilla JS", "SpringBoot", "Oracle DB"],
		link: "https://github.com/TVSSSRIPAD/Unimas",
		live: null,
		date: "08/2021",
	},
	{
		title: "Basic FTP Server in C++",
		description: "This was a project done as part of Computer Networks course during my undergrad.",
		tags: ["C++"],
		link: "https://github.com/TVSSSRIPAD/FTP",
		date: "08/2021",
	},
	{
		title: "C-Shell",
		description: "Simple shell implementation in C that supports basic commands, piping, and redirection.",
		tags: ["C"],
		link: "https://github.com/TVSSSRIPAD/CShell",
		date: "04/2021",
	},
];

export default function Projects() {
  const [viewMode, setViewMode] = useState<"card" | "list">("card");

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My Projects</h1>
        <p className="mt-4 text-muted-foreground">
          A collection of my recent work and side projects.<br/>
        </p>
      </div>

      <div className="flex justify-center mb-4">
        <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as "card" | "list")}>
          <ToggleGroupItem value="card" aria-label="Card view">
            <Grid2x2 className="h-4 w-4 mr-1" /> Card
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view">
            <List className="h-4 w-4 mr-1" /> List
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {viewMode === "card" ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Card key={project.title} className="fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 my-4">
                  <Badge key={project.date} variant="outline">
                    {project.date}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button asChild size="sm">
                  <a href={project.link} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                </Button>
                {project.live && (
                  <Button asChild variant="outline" size="sm">
                    <a href={project.live} target="_blank" rel="noreferrer">
                      Live Demo
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div 
              key={project.title} 
              className="border-b pb-4 cursor-pointer fade-in hover:bg-muted/20 p-4 rounded-lg transition-colors" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <div className="flex gap-2">
                  <a href={project.link} target="_blank" rel="noreferrer" className="text-sm font-medium text-primary hover:underline">
                    GitHub
                  </a>
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noreferrer" className="text-sm font-medium text-muted-foreground hover:underline">
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
              <p className="text-muted-foreground mb-2">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 my-4">
               <Badge key={project.date} variant="outline">
                  {project.date}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
