import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.postId = params.id;
        this.setTitle("Blogs");
    }

    async getHtml() {
        return `
        <div class="index_3 blog">
        <div class="holder">
            <div class="card">
                <div class="image">
                    <img src="https://img.freepik.com/free-photo/advisor-agent-sitting-desk-table-startup-office-analyzing-financial-graphs-report-typing-company-strategy-african-american-businessman-working-overtime-investment-report-business-concept_482257-66470.jpg?t=st=1728705044~exp=1728708644~hmac=09249d25df7b873825d535fe44d50e9fd6a3c3294eb16141e8ab303e8cac9bf7&w=826" alt="">
                </div>
                <div class="content">
                    <h2>Blog Heading Here</h2>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt harum quo expedita reiciendis suscipit voluptatem illo, neque, tempora iusto corrupti consequuntur culpa!</p>
                </div>
                <a href="/blog/1" class="cardLink">Read Blog</a>
            </div>
            <div class="card">
                <div class="image">
                    <img src="https://img.freepik.com/free-photo/advisor-agent-sitting-desk-table-startup-office-analyzing-financial-graphs-report-typing-company-strategy-african-american-businessman-working-overtime-investment-report-business-concept_482257-66470.jpg?t=st=1728705044~exp=1728708644~hmac=09249d25df7b873825d535fe44d50e9fd6a3c3294eb16141e8ab303e8cac9bf7&w=826" alt="">
                </div>
                <div class="content">
                    <h2>Blog Heading Here</h2>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt harum quo expedita reiciendis suscipit voluptatem illo, neque, tempora iusto corrupti consequuntur culpa!</p>
                </div>
                <a href="/blog/2" class="cardLink">Read Blog</a>
            </div>
            <div class="card">
                <div class="image">
                    <img src="https://img.freepik.com/free-photo/advisor-agent-sitting-desk-table-startup-office-analyzing-financial-graphs-report-typing-company-strategy-african-american-businessman-working-overtime-investment-report-business-concept_482257-66470.jpg?t=st=1728705044~exp=1728708644~hmac=09249d25df7b873825d535fe44d50e9fd6a3c3294eb16141e8ab303e8cac9bf7&w=826" alt="">
                </div>
                <div class="content">
                    <h2>Blog Heading Here</h2>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt harum quo expedita reiciendis suscipit voluptatem illo, neque, tempora iusto corrupti consequuntur culpa!</p>
                </div>
                <a href="/blog/3" class="cardLink">Read Blog</a>
            </div>
            <div class="card">
                <div class="image">
                    <img src="https://img.freepik.com/free-photo/advisor-agent-sitting-desk-table-startup-office-analyzing-financial-graphs-report-typing-company-strategy-african-american-businessman-working-overtime-investment-report-business-concept_482257-66470.jpg?t=st=1728705044~exp=1728708644~hmac=09249d25df7b873825d535fe44d50e9fd6a3c3294eb16141e8ab303e8cac9bf7&w=826" alt="">
                </div>
                <div class="content">
                    <h2>Blog Heading Here</h2>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt harum quo expedita reiciendis suscipit voluptatem illo, neque, tempora iusto corrupti consequuntur culpa!</p>
                </div>
                <a href="/blog/4" class="cardLink">Read Blog</a>
            </div>
            <div class="card">
                <div class="image">
                    <img src="https://img.freepik.com/free-photo/advisor-agent-sitting-desk-table-startup-office-analyzing-financial-graphs-report-typing-company-strategy-african-american-businessman-working-overtime-investment-report-business-concept_482257-66470.jpg?t=st=1728705044~exp=1728708644~hmac=09249d25df7b873825d535fe44d50e9fd6a3c3294eb16141e8ab303e8cac9bf7&w=826" alt="">
                </div>
                <div class="content">
                    <h2>Blog Heading Here</h2>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt harum quo expedita reiciendis suscipit voluptatem illo, neque, tempora iusto corrupti consequuntur culpa!</p>
                </div>
                <a href="/blog/5" class="cardLink">Read Blog</a>
            </div>
            <div class="card">
                <div class="image">
                    <img src="https://img.freepik.com/free-photo/advisor-agent-sitting-desk-table-startup-office-analyzing-financial-graphs-report-typing-company-strategy-african-american-businessman-working-overtime-investment-report-business-concept_482257-66470.jpg?t=st=1728705044~exp=1728708644~hmac=09249d25df7b873825d535fe44d50e9fd6a3c3294eb16141e8ab303e8cac9bf7&w=826" alt="">
                </div>
                <div class="content">
                    <h2>Blog Heading Here</h2>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt harum quo expedita reiciendis suscipit voluptatem illo, neque, tempora iusto corrupti consequuntur culpa!</p>
                </div>
                <a href="/blog/6" class="cardLink">Read Blog</a>
            </div>
        </div>
    </div>
        `;
    }
}