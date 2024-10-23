import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.postId = params.id;
        this.setTitle("Viewing blog");
    }

    async getHtml() {
        return `
        <div class="card-view-holder">
            <div class="card-view">
                <div class="image">
                    <img src="https://img.freepik.com/free-photo/advisor-agent-sitting-desk-table-startup-office-analyzing-financial-graphs-report-typing-company-strategy-african-american-businessman-working-overtime-investment-report-business-concept_482257-66470.jpg?t=st=1728705044~exp=1728708644~hmac=09249d25df7b873825d535fe44d50e9fd6a3c3294eb16141e8ab303e8cac9bf7&w=826" alt="">
                </div>
                <div class="content">
                    <h2>Blog Heading Here</h2>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt harum quo expedita reiciendis suscipit voluptatem illo, neque, tempora iusto corrupti consequuntur culpa!</p>
                </div>
                <a href="/blog" class="cardLink" data-link><i class='bx bx-arrow-back'></i> Back to Blogs</a>
            </div>
        </div>
        `;
    }
}