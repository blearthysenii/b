// Mobile Navigation Toggle
const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
  })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
  }
})

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document
  .querySelectorAll(
    ".skill-item, .project-card, .course-card, .contact-method"
  )
  .forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

// Typing effect that preserves HTML + permanent caret
function typeWriterHTML(element, speed = 50) {
  const childNodes = Array.from(element.childNodes)
  element.innerHTML = ""

  // Create caret element (permanent)
  const caret = document.createElement("span")
  caret.textContent = "|"
  caret.style.display = "inline-block"
  caret.style.animation = "blink 1s step-start infinite"
  element.appendChild(caret)

  function typeNode(nodes, i = 0) {
    if (i >= nodes.length) {
      // Caret stays, nuk largohet
      return
    }

    const node = nodes[i]

    if (node.nodeType === 3) {
      // Text node
      let j = 0
      function typeText() {
        if (j <= node.textContent.length) {
          caret.insertAdjacentText("beforebegin", node.textContent.charAt(j))
          j++
          setTimeout(typeText, speed)
        } else {
          typeNode(nodes, i + 1)
        }
      }
      typeText()
    } else if (node.nodeType === 1) {
      // Element node (e.g., span)
      const wrapper = document.createElement(node.tagName)
      wrapper.className = node.className
      element.insertBefore(wrapper, caret)
      let j = 0
      function typeChildText() {
        if (j <= node.textContent.length) {
          wrapper.textContent = node.textContent.substring(0, j)
          j++
          setTimeout(typeChildText, speed)
        } else {
          typeNode(nodes, i + 1)
        }
      }
      typeChildText()
    }
  }

  typeNode(childNodes)
}

// Initialize typing effect on page load
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title")
  typeWriterHTML(heroTitle, 50)
})

// Add hover effects to floating elements
document.querySelectorAll(".floating-element").forEach((element) => {
  element.addEventListener("mouseenter", () => {
    element.style.transform = "scale(1.1) translateY(-5px)"
    element.style.boxShadow = "0 5px 15px rgba(37, 99, 235, 0.3)"
  })

  element.addEventListener("mouseleave", () => {
    element.style.transform = "scale(1) translateY(0)"
    element.style.boxShadow = "none"
  })
})

// Add click-to-copy functionality for contact information
document.querySelectorAll(".contact-method").forEach((method) => {
  const emailMethod = method.querySelector("p")
  if (emailMethod && emailMethod.textContent.includes("@")) {
    method.addEventListener("click", (e) => {
      e.preventDefault()
      navigator.clipboard.writeText(emailMethod.textContent).then(() => {
        const originalText = emailMethod.textContent
        emailMethod.textContent = "Copied!"
        emailMethod.style.color = "var(--success)"
        setTimeout(() => {
          emailMethod.textContent = originalText
          emailMethod.style.color = "var(--text-secondary)"
        }, 2000)
      })
    })
  }
})

// Scroll progress bar
function createScrollProgress() {
  const progressBar = document.createElement("div")
  progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
        z-index: 9999;
        transition: width 0.1s ease;
    `
  document.body.appendChild(progressBar)

  window.addEventListener("scroll", () => {
    const scrolled =
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      100
    progressBar.style.width = scrolled + "%"
  })
}

createScrollProgress()