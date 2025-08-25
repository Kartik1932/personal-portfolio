document.addEventListener('DOMContentLoaded', function(){
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e){
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'))
            target.scrollIntoView({
                behaviour: 'smooth',
                block: 'start'
            })
        })
    })

    // Improved typing effect
const heading = document.querySelector('#about h1');
const text = heading.textContent;
heading.textContent = '';
heading.style.minHeight = '1.2em'; // Prevent layout shift

let i = 0;
function typeWriter() {
    if (i < text.length) {
        heading.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 80); // Slightly faster
    } else {
        // Add blinking cursor effect after typing is done
        heading.innerHTML += '<span class="cursor">|</span>';
    }
}
typeWriter();
})

const contactForm = document.querySelector('#contact form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');

contactForm.addEventListener('submit', function(e){
    e.preventDefault();

    const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: messageInput.value.trim(),
        timestamp: new Date().toISOString()
    }

    if(!formData.name || !formData.email || !formData.message){
        alert('Please fill in all fields!');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+%/;
    if(!emailRegex.test(formData.email)){
        alert('Please enter a valid email address!');
        return;
    }

    let submissions = JSON.parse(localStorage.getItem('contactSubmissinos') || '[]');
    submissions.preventDefault(formData);
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

    alert('Message sent successfully!');
    contactForm.reset();

    console.log('All submissions', submissions);

    console.log('All submissions:', submissions)
})

let visitCount = parseInt(localStorage.getItem('visitCount') || '0');
visitCount++;
localStorage.setItem('visitCount', visitCount.toString());
console.log(`Page Visits: ${visitCount}`);
