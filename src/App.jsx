import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { Github, Linkedin, Mail, Phone, ExternalLink, Code, Database, Server, Terminal, Menu, X, ChevronDown, Download, Cpu, Globe, Layers, Sparkles, Send, MessageCircle } from 'lucide-react';
import charanImage from './Charan.jpg';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState({});
  
  // Typewriter State
  const [typewriterText, setTypewriterText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Chatbot State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', text: "Hi! I'm Charan's AI assistant. Ask me anything about his skills, projects, or experience! ✨" }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Vanta background ref
  const vantaRef = useRef(null);

  // Resume Data
  const personalInfo = {
    name: "Charan Goud Ediga",
    roles: ["Full Stack Developer", "CSE Student"], // Roles for animation
    location: "📍 Kurnool, India",
    email: "charangoude@gmail.com",
    phone: "+91 91823 20871",
    github: "https://github.com/CharanGoude",
    linkedin: "https://www.linkedin.com/in/charangoud-e", 
    about: "Motivated Computer Science student skilled in Java, backend engineering, and full-stack development using React and Node.js. Experienced in building scalable applications, RESTful API development, and applying strong foundations in Data Structures, Algorithms, and System Design."
  };

  const skills = [
    { category: "Languages", icon: <Terminal size={24} />, items: ["Java", "JavaScript", "Python", "SQL"] },
    { category: "Frontend", icon: <Globe size={24} />, items: ["React.js", "HTML5", "CSS3", "Tailwind", "Responsive Design"] },
    { category: "Backend", icon: <Server size={24} />, items: ["Spring Boot", "Node.js", "RESTful APIs", "Microservices"] },
    { category: "Database & Tools", icon: <Database size={24} />, items: ["MySQL", "MongoDB", "Git", "GitHub", "VS Code", "Postman"] }
  ];

  useEffect(() => {
    let vantaEffect = null;
    // Initialize Vanta.NET if available (loaded from CDN in index.html)
    if (typeof window !== 'undefined' && window.VANTA && window.VANTA.NET && vantaRef.current) {
      vantaEffect = window.VANTA.NET({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.0,
        scaleMobile: 1.0,
        backgroundAlpha: 0.0,
        color: 0x38bdf8,
        color2: 0x8b5cf6,
        size: 1.2,
        spacing: 20.0
      });
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  const projects = [
    {
      title: "Job Portal System",
      tech: ["Java", "Spring Boot", "MySQL", "Thymeleaf"],
      description: "A full-stack job portal enabling job posting, filtering, and applicant tracking. Implemented secure authentication using Spring Security.",
      link: "https://github.com/CharanGoude",
      icon: <Layers size={40} />
    },
    {
      title: "Stock Price Prediction",
      tech: ["Python", "TensorFlow", "Keras", "LSTM"],
      description: "Built an LSTM-based model to forecast stock price trends using time-series data with optimized preprocessing and hyperparameter tuning.",
      link: "https://github.com/CharanGoude",
      icon: <Cpu size={40} />
    },
    {
      title: "Digital Time Capsule",
      tech: ["JavaScript", "HTML", "CSS"],
      description: "A web app allowing users to store content to be unlocked in the future. Features scheduling logic and secure local storage handling.",
      link: "https://github.com/CharanGoude",
      icon: <Code size={40} />
    },
    {
      title: "Personal Portfolio",
      tech: ["React", "CSS", "JavaScript"],
      description: "Responsive portfolio website showcasing skills and projects with a modern dark-themed UI and smooth animations.",
      link: "https://github.com/CharanGoude",
      icon: <Globe size={40} />
    }
  ];

  const experience = [
    {
      role: "Java Developer Intern",
      company: "Elevate Labs",
      duration: "Jun 2025 - Jul 2025 (2 months)",
      details: [
        "Developing and optimizing Java-based backend modules.",
        "Building RESTful APIs integrated into core application workflows.",
        "Collaborating in an Agile team on scalable backend architecture."
      ]
    }
  ];

  const education = [
    {
      degree: "B.Tech in Computer Science",
      school: "Dr. MGR Educational and Research Institute",
      year: "Aug 2022 - Present",
      score: "CGPA: 7.8"
    },
    {
      degree: "Intermediate (HSC)",
      school: "Sri Chaitanya Jr College, Kurnool",
      year: "2020 - 2022",
      score: "71.9%"
    },
    {
      degree: "Secondary School (SSC)",
      school: "Vijaya Vani High School, Nandikotkur",
      year: "2019 - 2020",
      score: "GPA: 10.0"
    }
  ];

  // Typewriter Effect Logic
  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % personalInfo.roles.length;
      const fullText = personalInfo.roles[i];

      setTypewriterText(isDeleting 
        ? fullText.substring(0, typewriterText.length - 1) 
        : fullText.substring(0, typewriterText.length + 1)
      );

      // Dynamic speed
      let speed = 150;
      if (isDeleting) speed = 50;
      if (!isDeleting && typewriterText === fullText) speed = 2000; // Pause at end

      setTypingSpeed(speed);

      if (!isDeleting && typewriterText === fullText) {
        setIsDeleting(true);
      } else if (isDeleting && typewriterText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [typewriterText, isDeleting, loopNum, typingSpeed, personalInfo.roles]);


  // Gemini API Integration
  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage = { role: 'user', text: chatInput };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsChatLoading(true);

    const apiKey = ""; // The execution environment provides the key at runtime.
    
    const systemPrompt = `
      You are an AI assistant for Charan Goud Ediga's portfolio website. 
      Your goal is to answer visitor questions about Charan based strictly on the following data.
      Be friendly, professional, and enthusiastic. Use emojis occasionally.
      
      DATA:
      Name: ${personalInfo.name}
      Role: ${personalInfo.roles.join(" & ")}
      About: ${personalInfo.about}
      Location: ${personalInfo.location}
      Contact: ${personalInfo.email}, ${personalInfo.phone}
      
      Skills: ${skills.map(s => s.category + ": " + s.items.join(", ")).join("; ")}
      
      Projects: ${projects.map(p => `${p.title} (${p.tech.join(", ")}): ${p.description}`).join("; ")}
      
      Experience: ${experience.map(e => `${e.role} at ${e.company} (${e.duration}). Details: ${e.details.join(", ")}`).join("; ")}
      
      Education: ${education.map(e => `${e.degree} at ${e.school} (${e.year}). Score: ${e.score}`).join("; ")}
      
      If the user asks something not in this data (like personal private info), politely say you don't know and suggest they email Charan directly.
      Keep answers concise (under 3 sentences usually).
    `;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `System Context: ${systemPrompt}\n\nUser Question: ${userMessage.text}` }]
          }]
        })
      });

      const data = await response.json();
      const aiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having a little trouble connecting to my brain right now. Try again later!";
      
      setChatMessages(prev => [...prev, { role: 'assistant', text: aiResponseText }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setChatMessages(prev => [...prev, { role: 'assistant', text: "Oops! Something went wrong. Please check your connection." }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 } 
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // Smooth scroll handler
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
      setActiveSection(id);
    }
  };

  return (
    <div className="app-container">
      

      {/* Animated Background */}
      <div className="background-animation" ref={vantaRef}>
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        <div className="blob blob-4"></div>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="container nav-content">
          <div className="logo" onClick={() => scrollToSection('home')}>
            &lt;Charan<span>Goud</span>/&gt;
          </div>
          <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((item) => (
              <a
                key={item}
                className={`nav-item ${activeSection === item ? 'active' : ''}`}
                onClick={() => scrollToSection(item)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container hero-content">
          
          <p className="hero-greeting">Hello, I'm</p>
          <h1 className="hero-name">{personalInfo.name}</h1>
          
          {/* Typewriter Animation */}
          <div className="hero-role-wrapper">
            <h2 className="hero-role">
              I am a <span className="typewriter-text">{typewriterText}</span>
            </h2>
          </div>

          <p className="hero-description">{personalInfo.about}</p>
          <div className="hero-buttons">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <Github size={20} /> Check Github
            </a>
            <a href="#contact" onClick={() => scrollToSection('contact')} className="btn btn-primary">
              <Mail size={20} /> Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section fade-in-section" style={{opacity: isVisible['about'] ? 1 : 0, transform: isVisible['about'] ? 'translateY(0)' : 'translateY(30px)'}}>
        <div className="container">
          <h2 className="section-title">About <span>Me</span></h2>
          <div className="about-card">
            <div className="about-grid">
              {/* Profile Image - Moved Here */}
              <div className="profile-wrapper">
                <img 
                  src={charanImage} 
                  alt="Charan Goud - Tech Student" 
                  className="profile-img" 
                />
              </div>

              {/* Text and Info */}
              <div className="about-content-right">
                <div className="about-text">
                  <p>
                    I am a passionate Computer Science student at Dr. MGR Educational and Research Institute with a strong focus on full-stack development. 
                    My journey involves solving complex problems using Data Structures and Algorithms, and building scalable web applications.
                  </p>
                  <p>
                    Currently expanding my knowledge in system design and cloud architecture. I love turning ideas into reality using code.
                  </p>
                </div>
                <div className="about-info">
                  <div className="info-grid">
                    <div className="info-item">
                      <h4>Location</h4>
                      <p>{personalInfo.location}</p>
                    </div>
                    <div className="info-item">
                      <h4>Email</h4>
                      <p style={{fontSize: '0.9rem'}}>{personalInfo.email}</p>
                    </div>
                    <div className="info-item">
                      <h4>Education</h4>
                      <p>B.Tech CSE</p>
                    </div>
                    <div className="info-item">
                      <h4>Availability</h4>
                      <p style={{color: '#4ade80'}}>Open for Internships</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section fade-in-section" style={{opacity: isVisible['skills'] ? 1 : 0, transform: isVisible['skills'] ? 'translateY(0)' : 'translateY(30px)'}}>
        <div className="container">
          <h2 className="section-title">My <span>Skills</span></h2>
          <div className="skills-grid">
            {skills.map((skillGroup, index) => (
              <div key={index} className="skill-card">
                <div className="skill-category">
                  {skillGroup.icon}
                  {skillGroup.category}
                </div>
                <div className="skill-list">
                  {skillGroup.items.map((skill, idx) => (
                    <span key={idx} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section fade-in-section" style={{opacity: isVisible['projects'] ? 1 : 0, transform: isVisible['projects'] ? 'translateY(0)' : 'translateY(30px)'}}>
        <div className="container">
          <h2 className="section-title">Featured <span>Projects</span></h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-content">
                  <div className="project-header">
                    <div className="project-icon-wrapper">
                      {project.icon}
                    </div>
                    <a href={project.link} target="_blank" rel="noreferrer" className="btn-icon">
                      <ExternalLink size={20} color="var(--accent)" />
                    </a>
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map((tech, idx) => (
                      <span key={idx} className="tech-tag">#{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience & Education Section */}
      <section id="experience" className="section fade-in-section" style={{opacity: isVisible['experience'] ? 1 : 0, transform: isVisible['experience'] ? 'translateY(0)' : 'translateY(30px)'}}>
        <div className="container">
          <h2 className="section-title">Experience & <span>Education</span></h2>
          
          <div className="timeline">
            {/* Experience */}
            {experience.map((exp, index) => (
              <div key={`exp-${index}`} className="timeline-item">
                <span className="timeline-date">{exp.duration}</span>
                <div className="timeline-content">
                  <h3 className="timeline-title">{exp.role}</h3>
                  <h4 className="timeline-subtitle">{exp.company}</h4>
                  <ul className="timeline-list">
                    {exp.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {/* Education */}
            {education.map((edu, index) => (
              <div key={`edu-${index}`} className="timeline-item">
                <span className="timeline-date">{edu.year}</span>
                <div className="timeline-content">
                  <h3 className="timeline-title">{edu.degree}</h3>
                  <h4 className="timeline-subtitle">{edu.school}</h4>
                  <p style={{color: 'var(--text-secondary)'}}>{edu.score}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section fade-in-section" style={{opacity: isVisible['contact'] ? 1 : 0, transform: isVisible['contact'] ? 'translateY(0)' : 'translateY(30px)'}}>
        <div className="container">
          <h2 className="section-title">Get In <span>Touch</span></h2>
          <div className="contact-content">
            <p className="contact-text">
              I'm currently looking for new opportunities and internships. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            <div className="contact-links">
              <a href={`mailto:${personalInfo.email}`} className="contact-item">
                <div className="contact-icon-box">
                  <Mail size={32} />
                </div>
                <span>Email Me</span>
              </a>
              <a href={`tel:${personalInfo.phone}`} className="contact-item">
                <div className="contact-icon-box">
                  <Phone size={32} />
                </div>
                <span>Call Me</span>
              </a>
            </div>
            <a href="https://drive.google.com/file/d/1lAR2lQ_iOP8agsel0wSN5nyIo-GOKgyf/view?usp=sharing" className="btn btn-outline">
              <Download size={18} /> Download Resume
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-socials">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="social-link"><Github size={24}/></a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="social-link"><Linkedin size={24}/></a>
            <a href={`mailto:${personalInfo.email}`} className="social-link"><Mail size={24}/></a>
          </div>
          <div className="footer-text">
            <p>Crafted with ❤️ and a passion for clean code</p>
            <p>Turning coffee into code since 2022</p>
            <p>© 2025 CharanGoud Ediga. All rights reserved</p>
          </div>
        </div>
      </footer>

      {/* Gemini Chat Widget */}
      <div className="chat-widget">
        {isChatOpen && (
          <div className="chat-window">
            <div className="chat-header">
              <h3><Sparkles size={18} /> Ask my AI Assistant</h3>
              <button onClick={() => setIsChatOpen(false)} style={{background:'none', border:'none', color:'white', cursor:'pointer'}}>
                <X size={18} />
              </button>
            </div>
            <div className="chat-body">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`message ${msg.role}`}>
                  {msg.text}
                </div>
              ))}
              {isChatLoading && (
                <div className="message assistant">
                  <div className="typing-indicator">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div className="chat-input-area">
              <input 
                type="text" 
                className="chat-input" 
                placeholder="Ask about my skills..." 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button className="send-btn" onClick={handleSendMessage} disabled={isChatLoading}>
                <Send size={18} />
              </button>
            </div>
          </div>
        )}
        <button className="chat-toggle" onClick={() => setIsChatOpen(!isChatOpen)}>
          {isChatOpen ? <X size={24} /> : <MessageCircle size={28} />}
        </button>
      </div>
    </div>
  );
};

export default App;