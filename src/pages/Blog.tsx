
import { useState } from "react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Grid2x2, List } from "lucide-react";
import { Link } from "react-router-dom";

const posts = [
  {
    title: "Intro to Garbage Collection in JVM",
    date: "April 30, 2024",
    description: "Exploring the black box of JVM garbage collection",
    category: "Java",
    readTime: "10 min read",
    link: "/posts/garbage-collection",
    bearBlogLink: "https://sripad.bearblog.dev/garbage-collection/"
  }, {
    title: "Introduction to Kotlin Coroutines",
    date: "April 10, 2025",
    description: "A beginner's guide to aysynchronous programming in Kotlin",
    category: "Kotlin",
    readTime: "5 min read",
    link: "/posts/kotlin-coroutines",
    bearBlogLink: "https://sripad.bearblog.dev/coroutines/"
  }
];

export default function Blog() {
  const [viewMode, setViewMode] = useState<"card" | "list">("card");

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Blog</h1>
        <p className="mt-4 text-muted-foreground">
          The below are my latest blog posts. <br />
          I write about programming in java, kotlin, web development and my recent explorations in the field of AI and ML.<br />
          You can find more posts on my <a href="https://sripad.bearblog.dev/" className="text-primary underline">Bear blog website also</a>.
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
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post, index) => (
            <Link to ={post.link}>
              <Card 
                key={post.title} 
                className="cursor-pointer fade-in hover:shadow-md transition-shadow" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex justify-between items-center mb-2">
                    <Badge variant="outline">{post.category}</Badge>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>{post.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">{post.readTime}</p>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post, index) => (
            <Link to={post.link} 
              key={post.title} 
              className="border-b pb-4 cursor-pointer fade-in hover:bg-muted/20 p-4 rounded-lg transition-colors" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <Badge variant="outline">{post.category}</Badge>
              </div>
              <p className="text-muted-foreground mb-2">{post.description}</p>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
