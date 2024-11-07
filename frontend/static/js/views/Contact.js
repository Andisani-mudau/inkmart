import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Contact Us");
    }

    async getHtml() {

        return `

            <div class="container index_5">
                <div class="newsLetter">
                    <div class="newsLatterHeading">
                      <h2>Talk to us</h2>
                      <p>Have something to say? Let us know, we will reply back to you as soon as possible.</p>
                    </div>
                    <form action="/send-contact" method="post" class="contactForm" id="contact-form">
                      <input type="email" name="email" id="contact-email" placeholder="Enter your email address" required>
                      <textarea name="message" id="contact-message" placeholder="Enter your message" required></textarea>
                      <button type="submit">Submit</button>
                    </form>
                </div>
            </div>

            <script>
                document.addEventListener('DOMContentLoaded', () => {
                    const contactForm = document.getElementById('contact-form');
                    if (contactForm) {
                        contactForm.addEventListener('submit', function(event) {
                            event.preventDefault();  // Prevent the default form submission

                            const email = document.getElementById('contact-email').value;
                            const message = document.getElementById('contact-message').value;

                            if (!email || !message) {
                                alert('Please fill in all required fields.');
                                return;
                            }

                            const formData = {
                                email: email,
                                message: message
                            };

                            // Submit to your backend using fetch
                            fetch('/send-contact', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(formData)
                            })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Network response was not ok');
                                }
                                return response.json();
                            })
                            .then(data => {
                                alert('Your message has been sent successfully!');
                                // Reset form if submission is successful
                                contactForm.reset();
                            })
                            .catch(error => {
                                console.error('Error:', error);
                                alert('There was an error sending your message. Please try again.');
                            });
                        });
                    }
                });
            </script>
        `;
    }
}
