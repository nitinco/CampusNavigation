import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MapPin,
  Building2,
  Navigation,
  ArrowRight,
  Zap,
  Clock,
  Users,
  Smartphone,
  Search,
  Map,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { assetUrl } from "@/lib/assetUrl";

const Landing = () => {
  const logoUrl = assetUrl("logo.png");

  const teamMembers = [
    {
      name: "Nitin",
      role: "Frontend Developer & UI/UX Designer",
      contribution: "built the full React interface and defined the user experience, led overall project development and coordination, designed and implemented the main website frontend, integrated interactive map and routing features using Leaflet.js, and managed team collaboration, version control, and code reviews.",
      github: "https://github.com/nitinco",
      linkedin: "https://www.linkedin.com/in/nitin-sharma-3bb53a2b1/",
    },
    {
      name: "Drishti Sharma",
      role: "Mapping, routing & GeoJSON data structuring and curation",
      contribution: "Created comprehensive campus GeoJSON data and map integration. Used geojson to plan the pathways for routes, plotted the various buildings and line strings for the locations. Assisted in routing and navigation.",
      github: "https://github.com/Fictioknox ",
      linkedin: "www.linkedin.com/in/drishti-sharma-88b3ab257 ",
    },
    {
      name: "Abhay Malav",
      role: "Research & Documentation",
      contribution: "Performed comprehensive research on existing navigation systems and novel approaches. Created detailed reports and presentations that shared the key findings and strategic recommendations for the project.",
      github: "https://github.com/AbhayMalav",
      linkedin: "https://www.linkedin.com/in/abhay-malav-37a1a7229/",
    },
    
    {
      name: "Pranjal Porwal",
      role: "Frontend Developer & Map Integration",
      contribution: "Implemented interactive map features, live location tracking, routing logic, and improved UI/UX responsiveness across the platform",
      github: "https://github.com/Pranjal1045",
      linkedin: "https://www.linkedin.com/in/pranjal-porwal-75a312257",
    },
  ];

  const faqs = [
    {
      question: "How accurate is the real-time location tracking?",
      answer:
        "Navi-Gator uses GPS with high-accuracy mode enabled, providing location accuracy within 5-10 meters on most devices. Accuracy improves in open areas.",
    },
    {
      question: "Does Navi-Gator work offline?",
      answer:
        "The map loads once online and caches locally. You can view the map offline, but real-time tracking and directions require an internet connection.",
    },
    {
      question: "Can I use Navi-Gator on my phone?",
      answer:
        "Yes! Navi-Gator is fully mobile-responsive and works on iOS and Android browsers. For best experience, use Chrome or Safari.",
    },
    {
      question: "Is my location data stored or tracked?",
      answer:
        "No. Your location is only used during your session and is never stored on our servers. All data stays on your device.",
    },
    {
      question: "How often is the campus map updated?",
      answer:
        "The map is updated regularly as campus infrastructure changes. We continuously improve accuracy and add new locations based on feedback.",
    },
    {
      question: "Can I report errors in the map or building information?",
      answer:
        "Yes! We welcome feedback. Please contact us at nitinjun006@gmail.com with any corrections or suggestions.",
    },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-background via-background to-muted">
      {/* ===== HERO SECTION ===== */}
      <section className="container px-4 py-16 md:py-28 space-y-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {/* Headline & Tagline */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 border border-primary/20">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">
                  Campus Navigation Made Simple
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Never Get Lost on{" "}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Campus Again
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-xl">
                Navi-Gator is your intelligent campus companion. Find any building, get
                turn-by-turn directions, and explore RTU Kota like a pro—all in real-time.
              </p>

              {/* Tagline for banners */}
              <div className="text-sm font-medium text-primary pt-2">
                🐊 Navigate Smart. Explore Easy.
              </div>
            </div>

            {/* Primary CTA & Secondary CTA */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/navigate" asChild>
                <Button size="lg" className="gap-2 text-base h-12">
                  Start Navigating Now
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/map" asChild>
                <Button size="lg" variant="outline" className="gap-2 text-base h-12">
                  Explore All Buildings
                  <MapPin className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Social Proof Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="space-y-1">
                <p className="text-3xl font-bold text-primary">26+</p>
                <p className="text-xs md:text-sm text-muted-foreground">Campus Buildings</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-primary">Real-time</p>
                <p className="text-xs md:text-sm text-muted-foreground">GPS Tracking</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-primary">100%</p>
                <p className="text-xs md:text-sm text-muted-foreground">Free & Open</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-full max-w-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-3xl"></div>
              <img
                src={logoUrl}
                alt="Navi-Gator Campus Navigator"
                className="relative w-full drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROBLEM STATEMENT ===== */}
      <section className="container px-4 py-16 md:py-24 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold">The Campus Navigation Problem</h2>
          <p className="text-lg text-muted-foreground">
            Every semester, thousands of students face the same frustration—getting lost on campus.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Problem 1 */}
          <Card className="border-0 shadow-sm bg-destructive/5">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="text-2xl">🗺️</span>
                Confusing Campus Layout
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                RTU Kota is sprawling and complex. Multiple blocks, hidden pathways, and
                departments scattered across the campus make navigation confusing for new
                students, visitors, and even during exams and placements.
              </p>
            </CardContent>
          </Card>

          {/* Problem 2 */}
          <Card className="border-0 shadow-sm bg-yellow-500/5">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="text-2xl">📍</span>
                Unreliable Solutions
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Google Maps doesn't understand campus-specific pathways. Printed maps go
                outdated. Asking people takes time and often leads to wrong directions. You
                need a campus-specific solution.
              </p>
            </CardContent>
          </Card>

          {/* Problem 3 */}
          <Card className="border-0 shadow-sm bg-orange-500/5">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="text-2xl">⏱️</span>
                Wasted Time & Stress
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Getting lost costs precious time—whether you're rushing to a class, attending
                an exam, visiting the library, or exploring campus during orientation. Stress
                and confusion slow you down.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Solution */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl border border-primary/20 p-8 md:p-12 space-y-4">
          <h3 className="text-2xl md:text-3xl font-bold">Navi-Gator: The Solution</h3>
          <p className="text-lg text-muted-foreground max-w-2xl">
            We built <strong>Navi-Gator</strong> specifically for RTU Kota. It combines an
            accurate campus map, smart routing, real-time location tracking, and detailed
            building information—all in one free, easy-to-use app. No setup, no signup. Just
            open, click, and navigate.
          </p>
          <div className="grid md:grid-cols-3 gap-4 pt-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm">Accurate, campus-aware routing</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm">Real-time GPS tracking on your phone</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm">100% free, zero ads, zero tracking</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW NAVI-GATOR WORKS ===== */}
      <section className="container px-4 py-16 md:py-24 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold">How Navi-Gator Works</h2>
          <p className="text-lg text-muted-foreground">
            Smart technology meets simple design. Here's what makes Navi-Gator your perfect
            campus guide.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Feature 1 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Map className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Interactive Campus Map</h3>
              <p className="text-muted-foreground">
                View the entire RTU Kota campus with all buildings, departments, hostels,
                facilities, and walkways. Click any building for instant information.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Navigation className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Smart Turn-by-Turn Routing</h3>
              <p className="text-muted-foreground">
                Get the shortest, smartest route between any two campus locations. Uses real
                campus pathways, not straight lines.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Real-Time Location Tracking</h3>
              <p className="text-muted-foreground">
                See your position in real-time as you walk. Know exactly where you are and
                stay on track to your destination.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Complete Building Database</h3>
              <p className="text-muted-foreground">
                26+ buildings with detailed info: departments, facilities, office hours, and
                important locations. Everything you need to know.
              </p>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Smart Search</h3>
              <p className="text-muted-foreground">
                Search by building name, department, facility type, or code. Find what you're
                looking for instantly.
              </p>
            </div>
          </div>

          {/* Feature 6 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Smartphone className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Mobile-First Design</h3>
              <p className="text-muted-foreground">
                Works perfectly on phones, tablets, and computers. Designed for navigation on
                the go.
              </p>
            </div>
          </div>
        </div>

        {/* Technology Info - for general audience */}
        <div className="bg-muted/50 rounded-xl border p-8 space-y-4">
          <h3 className="text-lg font-bold">Tech That Powers Navi-Gator</h3>
          <p className="text-muted-foreground">
            Built with cutting-edge web technologies: React for responsive performance,
            Mapbox for accurate mapping, GeoJSON for precise campus data, and TypeScript for
            reliability. The result? A fast, accurate, trustworthy navigation tool.
          </p>
        </div>
      </section>

      {/* ===== KEY FEATURES SECTION ===== */}
      <section className="container px-4 py-16 md:py-24 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold">Why Students Love Navi-Gator</h2>
          <p className="text-lg text-muted-foreground">
            Designed for every use case—from day one orientation to exam season rush.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature: Time Saver */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Clock className="h-6 w-6 text-primary" />
                <CardTitle className="text-lg">Saves Time</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                No more wandering. No more asking for directions. Get to your destination 50%
                faster.
              </p>
            </CardContent>
          </Card>

          {/* Feature: New Students */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Users className="h-6 w-6 text-primary" />
                <CardTitle className="text-lg">Perfect for New Students</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Orientation week? First day jitters? Navi-Gator helps you explore campus with
                confidence.
              </p>
            </CardContent>
          </Card>

          {/* Feature: Exam Season */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Zap className="h-6 w-6 text-primary" />
                <CardTitle className="text-lg">Exam Day Ready</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Know exactly where your exam room is. Arrive early, stay calm, perform well.
              </p>
            </CardContent>
          </Card>

          {/* Feature: Visitors & Guests */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="h-6 w-6 text-primary" />
                <CardTitle className="text-lg">Great for Visitors</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Parents visiting? Alumni coming back? Give them the link and they'll navigate
                like pros.
              </p>
            </CardContent>
          </Card>

          {/* Feature: Placement Season */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Building2 className="h-6 w-6 text-primary" />
                <CardTitle className="text-lg">Placement Season Hero</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Find placement centers, interview halls, and company offices instantly. No
                stress.
              </p>
            </CardContent>
          </Card>

          {/* Feature: Always Updated */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Navigation className="h-6 w-6 text-primary" />
                <CardTitle className="text-lg">Always Accurate</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Campus data is regularly updated. New buildings, new pathways, always current.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Secondary CTA */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl border border-primary/20 p-8 md:p-12 text-center space-y-6">
          <div className="space-y-2">
            <h3 className="text-3xl font-bold">Ready to Navigate Like a Pro?</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stop getting lost. Start exploring. Navi-Gator is free and ready to use right
              now.
            </p>
          </div>
          <Link to="/navigate" asChild>
            <Button size="lg" className="gap-2 text-base">
              Open Navi-Gator Now
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ===== TEAM SECTION ===== */}
      <section className="container px-4 py-16 md:py-24 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold">Built by Passionate Developers</h2>
          <p className="text-lg text-muted-foreground">
            Navi-Gator is a student-focused project built with care, modern technology, and a
            deep understanding of campus navigation challenges.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, idx) => (
            <Card key={idx} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{member.name}</CardTitle>
                <CardDescription className="text-xs font-medium text-primary">
                  {member.role}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{member.contribution}</p>
                <div className="flex gap-2 pt-2">
                  {member.github !== "#" && (
                    <a
                      href={member.github}
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                  )}
                  {member.linkedin !== "#" && (
                    <a
                      href={member.linkedin}
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-muted/50 rounded-xl border p-8 space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Got Feedback or Questions?
          </h3>
          <p className="text-muted-foreground">
            We'd love to hear from you! Have suggestions, found a bug, or want to contribute?
            Reach out to us at{" "}
            <a href="mailto:nitinjun006@gmail.com" className="text-primary font-medium">
              nitinjun006@gmail.com
            </a>
          </p>
        </div>
      </section>

      {/* ===== FAQs ===== */}
      <section className="container px-4 py-16 md:py-24 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">
            Common questions about Navi-Gator, answered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {faqs.map((faq, idx) => (
            <Card key={idx} className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {faq.answer}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tertiary CTA */}
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold">Still have questions?</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Check out our GitHub repository or contact us directly. We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/navigate" asChild>
              <Button size="lg" className="gap-2">
                Try Navi-Gator Free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <a href="mailto:nitinjun006@gmail.com" asChild>
              <Button size="lg" variant="outline" className="gap-2">
                <Mail className="h-5 w-5" />
                Contact Us
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA SECTION ===== */}
      <section className="container px-4 py-16 md:py-24">
        <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 rounded-2xl p-12 md:p-16 text-center space-y-8 text-white">
          <div className="space-y-3">
            <h2 className="text-4xl md:text-5xl font-bold">Join Hundreds of Happy Navigators</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Download Navi-Gator (or just open it in your browser) and start exploring campus
              today. It's 100% free, forever.
            </p>
          </div>

          <Link to="/navigate" asChild>
            <Button size="lg" variant="secondary" className="gap-2 text-base h-12">
              Start Your Journey
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>

          <p className="text-sm opacity-75">
            🐊 Navi-Gator: Navigate Smart. Explore Easy.
          </p>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t bg-muted/30">
        <div className="container px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <img src={logoUrl} alt="Navi-Gator" className="h-8 w-8" />
                <span className="font-bold text-lg">Navi-Gator</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Campus Navigator for Rajasthan Technical University, Kota.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h4 className="font-semibold">Navigation</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/map" className="hover:text-primary transition-colors">
                    Map
                  </Link>
                </li>
                <li>
                  <Link to="/buildings" className="hover:text-primary transition-colors">
                    Buildings
                  </Link>
                </li>
                <li>
                  <Link to="/navigate" className="hover:text-primary transition-colors">
                    Directions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-3">
              <h4 className="font-semibold">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#faq" className="hover:text-primary transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="https://github.com" className="hover:text-primary transition-colors">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact & Socials */}
            <div className="space-y-3">
              <h4 className="font-semibold">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="mailto:nitinjun006@gmail.com"
                    className="hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    nitinjun006@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com"
                    className="hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8 space-y-3 text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 Navi-Gator. All rights reserved. A campus navigation tool by students, for
              students.
            </p>
            <div className="flex gap-4 justify-center text-xs text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Cookie Policy
              </a>
            </div>
            <p className="text-xs text-muted-foreground pt-2">
              🐊 Navigate Smart. Explore Easy. | v1.0
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// CheckCircle icon component (not in lucide-react, so defining inline)
function CheckCircle({ className }: { className: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default Landing;
