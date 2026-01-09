import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { Github, Linkedin, Mail, Phone, ExternalLink, Code, Database, Server, Terminal, Menu, X, ChevronDown, Download, Cpu, Globe, Layers, Sparkles, Send, MessageCircle } from 'lucide-react';
import abdurImage from './abdur.jpeg';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState({});

 // Intersection Observer for navbar active and fade-in
useEffect(() => {
  const sections = document.querySelectorAll('section');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
          setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    },
    { threshold: 0.3 } // Updated threshold to show active on smaller visibility
  );

  sections.forEach(section => observer.observe(section));

  return () => sections.forEach(section => observer.unobserve(section));
}, []);

// ⭐ Navbar mobile menu scroll fix
useEffect(() => {
  document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
}, [isMenuOpen]);

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
  name: "Abdul Rehman",
  roles: ["Front end Developer"], // Roles for animation
  location: "📍 Liquatpur, Pakistan",
  email: "abdulrehman07043@gmail.com",
  phone: "+923270627581",
  github: "https://github.com/AbdulRehman-coss",
  linkedin: "https://www.linkedin.com/in/abdul-rehman-86114b397/", 
  about: "Creative Front-End Developer skilled in HTML, CSS, JavaScript, React, Tailwind, and Bootstrap. Passionate about building modern, responsive, and user-friendly web interfaces that deliver exceptional user experiences."
};

  const skills = [
    { 
      category: "Core Frontend", 
      icon: <Globe size={24} />, 
      items: ["HTML5", "CSS3", "JavaScript (ES6)"] 
    },
    { 
      category: "Frameworks & Libraries", 
      icon: <Code size={24} />, 
      items: ["React.js", "Bootstrap", "Tailwind CSS"] 
    },
    { 
      category: "UI / Styling", 
      icon: <Layers size={24} />, 
      items: ["Flexbox", "CSS Grid", "Responsive Design"] 
    },
    { 
      category: "Tools", 
      icon: <Terminal size={24} />, 
      items: ["Git", "GitHub", "VS Code", "Chrome DevTools"] 
    }
  ];

  useEffect(() => {
    let vantaEffect = null;
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
    return () => { if (vantaEffect) vantaEffect.destroy(); };
  }, []);

  const projects = [
    {
      title: "Personal Portfolio Website",
      tech: ["React", "HTML", "CSS", "JavaScript"],
      description: "A modern and responsive personal portfolio website to showcase my skills, projects, and experience.",
      link: "https://github.com/AbdulRehman-coss",
      icon: <Globe size={40} />
    },
    {
      title: "E-Commerce Website UI",
      tech: ["HTML", "CSS", "Bootstrap", "JavaScript"],
      description: "A fully responsive e-commerce website front-end with product listings and modern UI design.",
      link: "https://github.com/AbdulRehman-coss",
      icon: <Layers size={40} />
    },
    {
      title: "Landing Page Design",
      tech: ["HTML", "Tailwind CSS", "JavaScript"],
      description: "A clean and modern landing page with smooth animations and responsive layout.",
      link: "https://github.com/AbdulRehman-coss",
      icon: <Code size={40} />
    },
    {
      title: "Dashboard UI",
      tech: ["React", "CSS", "JavaScript"],
      description: "An interactive dashboard UI with reusable components built using React.",
      link: "https://github.com/AbdulRehman-coss",
      icon: <Terminal size={40} />
    }
  ];

  const education = [
    {
      degree: "Matriculation",
      school: "Government High School",
      year: "2021 - 2023",
      score: "All subjects passed"
    }
  ];

  const experience = [
    {
      role: "Web Development Learning",
      company: "Self-Learning / Online Courses",
      duration: "2024 - 2025 (1 year)",
      details: [
        "Completed 1 year of focused web development learning.",
        "Gained strong skills in HTML, CSS, JavaScript, React, Tailwind, and Bootstrap.",
        "Built multiple personal projects to practice front-end development."
      ]
    },
    {
      role: "Freelance Front-End Projects",
      company: "Self / Client Work",
      duration: "2025 (8 months)",
      details: [
        "Worked on various front-end projects independently.",
        "Implemented responsive UI, animations, and modern design patterns.",
        "Gained practical experience in delivering professional web applications."
      ]
    },
    {
      role: "Front-End Developer Intern",
      company: "Bixisoft, Multan",
      duration: "2025 (1 month)",
      details: [
        "Worked on live projects as part of the front-end team.",
        "Contributed to responsive web interfaces and interactive components.",
        "Applied skills in React, Tailwind, and Bootstrap to real-world applications."
      ]
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

      let speed = isDeleting ? 50 : 150;
      if (!isDeleting && typewriterText === fullText) speed = 2000;

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

  // Gemini API Integration (unchanged)
  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    const userMessage = { role: 'user', text: chatInput };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsChatLoading(true);

    const apiKey = ""; // runtime key
    const systemPrompt = `...`; // same as your original

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `System Context: ${systemPrompt}\n\nUser Question: ${userMessage.text}` }] }]
        })
      });
      const data = await response.json();
      const aiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having a little trouble connecting to my brain right now. Try again later!";
      setChatMessages(prev => [...prev, { role: 'assistant', text: aiResponseText }]);
    } catch (error) {
      console.error(error);
      setChatMessages(prev => [...prev, { role: 'assistant', text: "Oops! Something went wrong. Please check your connection." }]);
    } finally { setIsChatLoading(false); }
  };

  // Auto-scroll chat
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatMessages]);

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
          <div className="logo" onClick={() => scrollToSection('home')}>&lt;Abdul<span>Rehman</span>/&gt;</div>
          <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map(item => (
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
                  src={abdurImage} 
                  alt="Abdur - Profile" 
                  className="profile-img" 
                />
              </div>

              {/* Text and Info */}
              <div className="about-content-right">
                <div className="about-text">
                 <p>
  I am a passionate Front-End Developer with strong skills in HTML, CSS, JavaScript, React, Tailwind, and Bootstrap. 
  I enjoy creating interactive and responsive web interfaces that provide seamless user experiences.
</p>
<p>
  I am constantly learning new web technologies and improving my design skills to turn creative ideas into reality. 
  My goal is to build modern, user-friendly websites that make an impact.
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
                      <p>Matric</p>
                    </div>
                    <div className="info-item">
                      <h4>Availability</h4>
                      <p style={{color: '#4ade80'}}>Open for work</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
     <section 
  id="skills" 
  className="section fade-in-section" 
  style={{
    opacity: isVisible['skills'] ? 1 : 0,
    transform: isVisible['skills'] ? 'translateY(0)' : 'translateY(30px)'
  }}
>
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
{/* Education & Experience Section */}
<section 
  id="experience" 
  className="section fade-in-section" 
  style={{
    opacity: isVisible['experience'] ? 1 : 0,
    transform: isVisible['experience'] ? 'translateY(0)' : 'translateY(30px)'
  }}
>
  <div className="container">
    <h2 className="section-title">Education & <span>Experience</span></h2>
    
    <div className="timeline">
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
    </div>
  </div>
</section>

      {/* Contact Section */}
      <section id="contact" className="section fade-in-section" style={{opacity: isVisible['contact'] ? 1 : 0, transform: isVisible['contact'] ? 'translateY(0)' : 'translateY(30px)'}}>
        <div className="container">
          <h2 className="section-title">Get In <span>Touch</span></h2>
          <div className="contact-content">
            <p className="contact-text">
             I'm open to new opportunities and internships. Feel free to reach out with questions or just to say hello-I’ll get back to you as soon as I can!
            </p>
            <div className="contact-links">
              <a href={`mailto:${personalInfo.email}`} className="contact-item">
                <div className="contact-icon-box">
                  <Mail size={32} />
                </div>
                <span>Email Me</span>
                <span>my bro</span>
                
              </a>
              <a href={`tel:${personalInfo.phone}`} className="contact-item">
                <div className="contact-icon-box">
                  <Phone size={32} />
                </div>
                <span>Call Me</span>
              </a>
            </div>
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
  <p>Crafted with ❤️ and a love for clean, efficient code</p>
  <p>Turning coffee into code since 2022 ☕💻</p>
  <p>© 2025 Abdul Rehman. All rights reserved</p>
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