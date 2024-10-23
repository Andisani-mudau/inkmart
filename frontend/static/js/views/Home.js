import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Home");
    }

    async getHtml() {
        return `
        <div class="container index_1">
          <div class="welcome">
              <h1 class="indexHeading">Your Office Equipment</h1>
              <p class="indexParagrapgh">Just so you know, Inkmart is your local supplier of consumables and stationary in Limpopo. We're just saying!</p>
              <a href="/about" class="readMore">Read more...</a>
          </div>
        </div>
        <div class="container index_2">
            <input type="radio" name="slide" id="c1" checked>
              <label for="c1" class="card">
                <div class="row">
                  <div class="icon">1</div>
                  <div class="description">
                    <h4>Compters</h4>
                    <p>Winter has so much to offer - creative activities</p>
                  </div>
                </div>
              </label>
        
              <input type="radio" name="slide" id="c2">
              <label for="c2" class="card">
                <div class="row">
                  <div class="icon">2</div>
                  <div class="description">
                    <h4>Printers</h4>
                    <p>Gets better every day - stay tunned</p>
                  </div>
                </div>
              </label>
        
              <input type="radio" name="slide" id="c3">
              <label for="c3" class="card">
                <div class="row">
                  <div class="icon">3</div>
                  <div class="description">
                    <h4>Copiers</h4>
                    <p>Help people all over the world</p>
                  </div>
                </div>
              </label>
        
              <input type="radio" name="slide" id="c4">
              <label for="c4" class="card">
                <div class="row">
                  <div class="icon">4</div>
                  <div class="description">
                    <h4>Telecommunications</h4>
                    <p>Space engineering becomes more and more advanced</p>
                  </div>
                </div>
              </label>
    
              <input type="radio" name="slide" id="c5">
              <label for="c5" class="card">
                <div class="row">
                  <div class="icon">5</div>
                  <div class="description">
                    <h4>Solar Panels</h4>
                    <p>Space engineering becomes more and more advanced</p>
                  </div>
                </div>
              </label>
        </div>
        <div class="container index_3 blog">
            <div class="holder">
                  <div class="card">
                  <div class="image">
                      <img src="https://img.freepik.com/free-photo/advisor-agent-sitting-desk-table-startup-office-analyzing-financial-graphs-report-typing-company-strategy-african-american-businessman-working-overtime-investment-report-business-concept_482257-66470.jpg?t=st=1728705044~exp=1728708644~hmac=09249d25df7b873825d535fe44d50e9fd6a3c3294eb16141e8ab303e8cac9bf7&w=826" alt="">
                  </div>
                  <div class="content">
                      <h2>Blog Heading Here</h2>
                      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt harum quo expedita reiciendis suscipit voluptatem illo, neque, tempora iusto corrupti consequuntur culpa!</p>
                  </div>
                  <a href="/blog/1" class="cardLink" data-link>Read Blog</a>
              </div>
              <div class="card">
                  <div class="image">
                      <img src="https://img.freepik.com/free-photo/advisor-agent-sitting-desk-table-startup-office-analyzing-financial-graphs-report-typing-company-strategy-african-american-businessman-working-overtime-investment-report-business-concept_482257-66470.jpg?t=st=1728705044~exp=1728708644~hmac=09249d25df7b873825d535fe44d50e9fd6a3c3294eb16141e8ab303e8cac9bf7&w=826" alt="">
                  </div>
                  <div class="content">
                      <h2>Blog Heading Here</h2>
                      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt harum quo expedita reiciendis suscipit voluptatem illo, neque, tempora iusto corrupti consequuntur culpa!</p>
                  </div>
                  <a href="/blog/2" class="cardLink" data-link>Read Blog</a>
              </div>
              <div class="card">
                  <div class="image">
                      <img src="https://img.freepik.com/free-photo/advisor-agent-sitting-desk-table-startup-office-analyzing-financial-graphs-report-typing-company-strategy-african-american-businessman-working-overtime-investment-report-business-concept_482257-66470.jpg?t=st=1728705044~exp=1728708644~hmac=09249d25df7b873825d535fe44d50e9fd6a3c3294eb16141e8ab303e8cac9bf7&w=826" alt="">
                  </div>
                  <div class="content">
                      <h2>Blog Heading Here</h2>
                      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt harum quo expedita reiciendis suscipit voluptatem illo, neque, tempora iusto corrupti consequuntur culpa!</p>
                  </div>
                  <a href="/blog/3" class="cardLink" data-link>Read Blog</a>
              </div>
            </div>
        </div>
        <div class="container index_4">
            <div class="holder">
                <div class="card">
                    <div class="image"><div></div></div>
                    <div class="content"></div>
                    <a href="#" class="cardLink"></a>
                </div>
                <div class="card">
                    <div class="image"><div></div></div>
                    <div class="content"></div>
                    <a href="#" class="cardLink"></a>
                </div>
                <div class="card">
                    <div class="image"><div></div></div>
                    <div class="content"></div>
                    <a href="#" class="cardLink"></a>
                </div>
                <div class="card">
                    <div class="image"><div></div></div>
                    <div class="content"></div>
                    <a href="#" class="cardLink"></a>
                </div>
                <div class="card">
                    <div class="image"><div></div></div>
                    <div class="content"></div>
                    <a href="#" class="cardLink"></a>
                </div>
                <div class="card">
                    <div class="image"><div></div></div>
                    <div class="content"></div>
                    <a href="#" class="cardLink"></a>
                </div>
            </div>
        </div>
        <div class="container index_5">
            <div class="newsLetter">
              <div class="newsLatterHeading">
                <h2>Subscribe to our news letter!</h2>
                <p>Get notified about tips, tricks and blogs on how to best use your office environment.</p>
              </div>
              <form action="" method="post">
                <input type="email" name="email" id="" placeholder="Enter your email address">
                <button type="submit">Sign Up</button>
              </form>
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
                <img src="company-logos/brother-4.svg" alt="Logo 1" class="logo">
                <img src="company-logos/hp-2.svg" alt="Logo 2" class="logo">
                <img src="company-logos/kyocera-logo.svg" alt="Logo 3" class="logo">
                <img src="company-logos/lexmark-1 (1).svg" alt="Logo 4" class="logo">
                <img src="company-logos/olivetti.svg" alt="Logo 5" class="logo">
                <img src="company-logos/riso.svg" alt="Logo 6" class="logo">
                <img src="company-logos/samsung-8.svg" alt="Logo 7" class="logo">
    
                <!-- Repeat the same logos for infinite loop -->
                <img src="company-logos/brother-4.svg" alt="Logo 1" class="logo">
                <img src="company-logos/hp-2.svg" alt="Logo 2" class="logo">
                <img src="company-logos/kyocera-logo.svg" alt="Logo 3" class="logo">
                <img src="company-logos/lexmark-1 (1).svg" alt="Logo 4" class="logo">
                <img src="company-logos/olivetti.svg" alt="Logo 5" class="logo">
                <img src="company-logos/riso.svg" alt="Logo 6" class="logo">
                <img src="company-logos/samsung-8.svg" alt="Logo 7" class="logo">
            </div>
            </div>
        </div>
        `;
    }
}