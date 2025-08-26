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

contactForm.addEventListener('submit', async function(e){
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

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(formData.email)){
        alert('Please enter a valid email address!');
        return;
    }

    try{
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if(response.ok){
            const result = await response.json();
            alert('Message sent successfully!');
            contactForm.reset()
            console.log('Submission successfull:', result);
        } else {
            const error = await response.json();
            alert(`Error: ${error.error}`);
        }
    } catch(error){
        console.error('Network error:', error);
        alert('Network error. Please try again')
    }
})

async function updateVisitCount() {
    try{
        const response = await fetch('/api/visit-count');
        const data = await response.json();
        console.log(`Page visits: ${data.count}`);
    } catch(error){
        console.error('Failed to get visit count: ', error);
    }
}
updateVisitCount();