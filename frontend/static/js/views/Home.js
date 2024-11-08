import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Home");
    }

    async getHtml() {
        try {
            // Fetch external JSON data representing the blogs
            const blogResponse = await fetch('static/data/blogs.json');
            if (!blogResponse.ok) {
                throw new Error(`HTTP error! Status: ${blogResponse.status}`);
            }
            const blogs = await blogResponse.json();

            // Select only the first three blogs
            const selectedBlogs = blogs.slice(0, 3);

            // Generate HTML for each blog card dynamically
            const blogCards = selectedBlogs.map(blog => `
                <div class="card">
                    <div class="image">
                        <img src="${blog.image}" alt="${blog.title}">
                    </div>
                    <div class="content">
                        <h2>${blog.title}</h2>
                        <p>${blog.summary}</p>
                    </div>
                    <a href="/blog/${blog.id}" class="cardLink" data-link>Read Blog</a>
                </div>
            `).join('');

            // Fetch external JSON data representing the comments
            const commentResponse = await fetch('static/data/comments.json');
            if (!commentResponse.ok) {
                throw new Error(`HTTP error! Status: ${commentResponse.status}`);
            }
            const comments = await commentResponse.json();

            // Generate HTML for each comment card dynamically
            const commentCards = comments.map(comment => `
                <div class="card" id="card-${comment.id}">
                    <div class="content">
                        <div class="stars">
                            ${generateStars(comment.stars)}
                        </div>
                    </div>
                    <p class="comment">${comment.text}</p>
                </div>
            `).join('');

            // Return the complete HTML structure with dynamically generated blog and comment cards
            return `
                <div class="container index_1">
                  <div class="welcome">
                      <h1 class="indexHeading">Your Office Equipment</h1>
                      <p class="indexParagrapgh">Just so you know, Inkmart is your local supplier of consumables and stationary in Limpopo. We're just saying!</p>
                      <a href="/about" class="readMore" data-link>Read more...</a>
                  </div>
                </div>
                <div class="container index_2">
                    <input type="radio" name="slide" id="c1" checked>
                      <label for="c1" class="card">
                        <div class="row">
                          <div class="icon">1</div>
                          <div class="description">
                            <h4>Computers</h4>
                            <p>We offer a wide range of computers to meet all your business needs.</p>
                          </div>
                        </div>
                      </label>
                
                      <input type="radio" name="slide" id="c2">
                      <label for="c2" class="card">
                        <div class="row">
                          <div class="icon">2</div>
                          <div class="description">
                            <h4>Printers</h4>
                            <p>We offer a wide range of printers to meet all your business needs.</p>
                          </div>
                        </div>
                      </label>
                
                      <input type="radio" name="slide" id="c3">
                      <label for="c3" class="card">
                        <div class="row">
                          <div class="icon">3</div>
                          <div class="description">
                            <h4>Copiers</h4>
                            <p>We offer a wide range of copiers to meet all your business needs.</p>
                          </div>
                        </div>
                      </label>
                
                      <input type="radio" name="slide" id="c4">
                      <label for="c4" class="card">
                        <div class="row">
                          <div class="icon">4</div>
                          <div class="description">
                            <h4>Telecommunications</h4>
                            <p>We offer a wide range of telecommunications to meet all your business needs.</p>
                          </div>
                        </div>
                      </label>
            
                      <input type="radio" name="slide" id="c5">
                      <label for="c5" class="card">
                        <div class="row">
                          <div class="icon">5</div>
                          <div class="description">
                            <h4>Solar Panels</h4>
                            <p>We offer a wide range of solar panels to meet all your business needs.</p>
                          </div>
                        </div>
                      </label>
                </div>
                <div class="container index_3 blog">
                    <div class="holder">
                        ${blogCards}
                    </div>
                </div>
                <div class="container index_4">
                    <div class="holder">
                        ${commentCards}
                    </div>
                </div>
                <div class="container index_5">
                    <div class="newsLetter">
                        <div class="newsLatterHeading">
                            <h2>Subscribe to our newsletter!</h2>
                            <p>Get notified about tips, tricks, and blogs on how to best use your office environment.</p>
                        </div>
                        <form id="newsletter-form">
                            <input type="email" name="email" id="newsletter-email" placeholder="Enter your email address" required>
                            <button type="submit">Sign Up</button>
                        </form>
                        <div id="newsletter-response" style="margin-top: 10px;"></div>
                    </div>
                    <div class="icons">
                        <a href="#">
                          <div class="layer">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span class="fab fa-facebook-f"></span>
                          </div>
                        <div class="text">Facebook</div>
                        </a>
                        <a href="#">
                            <div class="layer">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span class="fab fa-twitter"></span>
                            </div>
                            <div class="text">Twitter</div>
                        </a>
                        <a href="#">
                            <div class="layer">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span class="fab fa-instagram"></span>
                            </div>
                        <div class="text">Instagram</div>
                        </a>
                        <a href="#">
                            <div class="layer">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span class="fab fa-linkedin-in"></span>
                            </div>
                            <div class="text">Linkedin</div>
                        </a>
                        <a href="#">
                            <div class="layer">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span class="fab fa-youtube"></span>
                            </div>
                            <div class="text">YouTube</div>
                        </a>
                      </div>
                    <div class="companies logo-slider">
                      <div class="slider-track">
                        <!-- Add your 7 logo SVGs here -->
                        <div class="company-logo"><img src="static/css/company-logos/brother.svg" alt="Logo 1"></div>
                        <div class="company-logo"><img src="static/css/company-logos/olivetti.svg" alt="Logo 2"></div>
                        <div class="company-logo"><img src="static/css/company-logos/hp.svg" alt="Logo 3"></div>
                        <div class="company-logo"><img src="static/css/company-logos/kyocera.svg" alt="Logo 4"></div>
                        <div class="company-logo"><img src="static/css/company-logos/lexmark.svg" alt="Logo 5"></div>
                        <div class="company-logo"><img src="static/css/company-logos/riso.svg" alt="Logo 6"></div>
                        <div class="company-logo"><img src="static/css/company-logos/samsung.svg" alt="Logo 7"></div>
    
                        <!-- Repeat the same logos for infinite loop -->
                        <div class="company-logo"><img src="static/css/company-logos/brother.svg" alt="Logo 1"></div>
                        <div class="company-logo"><img src="static/css/company-logos/olivetti.svg" alt="Logo 2"></div>
                        <div class="company-logo"><img src="static/css/company-logos/hp.svg" alt="Logo 3"></div>
                        <div class="company-logo"><img src="static/css/company-logos/kyocera.svg" alt="Logo 4"></div>
                        <div class="company-logo"><img src="static/css/company-logos/lexmark.svg" alt="Logo 5"></div>
                        <div class="company-logo"><img src="static/css/company-logos/riso.svg" alt="Logo 6"></div>
                        <div class="company-logo"><img src="static/css/company-logos/samsung.svg" alt="Logo 7"></div>
                      </div>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Error fetching blogs:', error);
            return `
                <div class="container index_1">
                  <div class="welcome">
                      <h1 class="indexHeading">Your Office Equipment</h1>
                      <p class="indexParagrapgh">Just so you know, Inkmart is your local supplier of consumables and stationary in Limpopo. We're just saying!</p>
                      <a href="/about" class="readMore" data-link>Read more...</a>
                  </div>
                </div>
                <div class="container index_2">
                    <!-- Existing content remains unchanged -->
                </div>
                <div class="container index_3 blog">
                    <div class="holder">
                        <div class="error">Failed to load blogs. Please try again later.</div>
                    </div>
                </div>
                <div class="container index_4">
                    <!-- Existing content remains unchanged -->
                </div>
                <div class="container index_5">
                    <!-- Existing content remains unchanged -->
                </div>
            `;
        }
    }

    async afterRender() {
      // Handle Newsletter Form Submission
      const newsletterForm = document.getElementById('newsletter-form');
      const newsletterResponse = document.getElementById('newsletter-response');

      newsletterForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          newsletterResponse.textContent = 'Subscribing...';

          const email = document.getElementById('newsletter-email').value;

          try {
              const response = await fetch('/send-newsletter', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ email })
              });

              if (response.ok) {
                  newsletterResponse.textContent = 'Successfully subscribed to the newsletter!';
                  newsletterForm.reset();
              } else {
                  const errorData = await response.json();
                  newsletterResponse.textContent = `Error: ${errorData.error}`;
              }
          } catch (error) {
              newsletterResponse.textContent = 'An unexpected error occurred.';
              console.error('Error:', error);
          }
      });
  }
}

// Helper function to generate star icons based on the number of stars
function generateStars(rating) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            starsHtml += `<i class="fas fa-star"></i>`;
        } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
            starsHtml += `<i class="fas fa-star-half-alt"></i>`;
        } else {
            starsHtml += `<i class="far fa-star"></i>`;
        }
    }
    return starsHtml;
}