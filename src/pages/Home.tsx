
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Briefcase } from "lucide-react";

export default function Home() {
  return <div className="space-y-12">
      <section className="space-y-6 pt-6 md:pt-10 lg:pt-4">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="fade-in text-4xl font-semibold tracking-tighter sm:text-5xl md:text-6xl">
            Hello, I'm <span className="text-primary">Sripad</span>
          </h1>
          <p className="fade-in fade-in-delay-1 leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            I am currently working as a SDE-2 at amazon. <br/>
            I'm a full-stack software developer with a passion for building modern web applications. <br/>
            Welcome to my portfolio.
          </p>
          <div className="fade-in fade-in-delay-2 flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link to="/projects">View Projects</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="https://github.com/TVSSSRIPAD" target="_blank">
                GitHub Profile
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container space-y-6">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Work Experience</h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            My professional journey so far:
          </p>
        </div>

        <div className="mx-auto max-w-[64rem]">
          <ul className="space-y-4">
            {[{
              title: "Software Development Engineer - 2",
              company: "Amazon",
              period: "2024 - Present",
              description: " - Working in Amazon Customer Service Capacity Planning Optimization team.<br> \
               - Developed microservice to automate calculation of current staffing data.<br> \
               - Focused on building scalable solutions to optimize planning for CustomerService Agent staffings."
            }, {
              title: "Software Development Engineer - 1",
              company: "Amazon",
              period: "2022-2024",
              description: "- Was part of Amazon Freight Order Management team<br> \
                - Streamlined appointment procurement workflow for Amazon Freight orders in OrderingWorkflow<br> \
                - Was responsible for building feature of sidelining orders in Amazon Freight<br> \
                - Designed and built a task management system for Amazon Freight operators<br> \
                - Was completely responsible for devloping and launching marking website for <a style=\"color:blue;\" href=\"http://ship-freight.amazon.in/\">Amazon Freight India website</a><br> \
                - Worked on backend systems for launching live tracking of orders in AmazonFreight website.<br> \
                - Worked on migrating Shipment confirmation emails from legacy system to a modern event driven system.<br>"
            }, {
              title: "Software Development Engineer - Intern",
              company: "Amazon",
              period: "2021",
              description: "- Worked in ShipWithAmazon (Transportation) team.<br> \
                - Worked on launching <a style=\"color:blue;\" href=\"https://shipping.amazon.it/\">  ShipWithAmazon in IT (italy) region.</a><br> \
                - Was solely responsible for supporting creation of bulk shipments (from CSV) in ShipWithAmazon IT (italy) website.<br>"
            }, {
              title: "Software Engineer Intern",
              company: "Trinity Labs",
              period: "2020",
              description: "Worked in stealth mode startup. Developed a restaurant management web application using MERN stack."
            }].map((item, index) => (
              <li 
                key={item.title} 
                className="slide-in border-b pb-4 last:border-b-0"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 rounded-full bg-muted">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <div className="mb-1">
                      <span className="font-medium">{item.company}</span>
                      <span className="text-muted-foreground text-sm ml-2">({item.period})</span>
                    </div>
                    <p dangerouslySetInnerHTML={{ __html: item.description }}></p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container space-y-6">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Skills</h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Here are some of the technologies I specialize in:
          </p>
        </div>

        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {[
             {
              title: "Back-end Development",
              description: "Java (SpringBoot), Kotlin, AWS, Node.js, Express.js"
            }, {
              title: "Database",
              description: "DynamoDB, MongoDB, PostgreSQL, MySQL"
            }, {
              title: "Cloud",
              description: "AWS (S3, DynamoDB, SQS, SNS, StepFunctions, EC2, ECS, Cloudwatch, EventBridge, Bedrock), AWS CDK (Infrastructure as Code)"
            }, {
              title: "Front-end Development",
              description: "React, TypeScript, Redux, Angular"
            },{
              title: "DevOps",
              description: "Docker, AWS, CI/CD"
            }, {
              title: "Version Control",
              description: "Git, GitHub, GitLab"
            }].map((item, index) => <div key={item.title} className="slide-in rounded-lg border bg-card p-6 text-card-foreground shadow-sm" style={{
              animationDelay: `${(index + 1) * 100}ms`
            }}>
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>)}
        </div>
      </section>
    </div>;
}
