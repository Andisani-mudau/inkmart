import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Settings");
    }

    async getHtml() {
        return `

            <div class="container index_5">
                <div class="newsLetter">
                    <div class="newsLatterHeading">
                      <h2>Talk to us</h2>
                      <p>Have something to say? Let us know, we will reply abck to you as soon as possible.</p>
                    </div>
                    <form action="" method="post" class="contactForm">
                      <input type="email" name="email" id="" placeholder="Enter your email address">
                      <input type="text" name="text" id="" placeholder="Enter your message">
                      <button type="submit">Submit</button>
                    </form>
                  </div>
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
                </div>
            </div>
        `;
    }
}