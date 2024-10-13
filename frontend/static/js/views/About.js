import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        
        this.setTitle("Viewing Post");
    }

    async getHtml() {
        return `
        <div class="container index_1">
            <div class="welcome about-edit">
                <h1 class="indexHeading">About Us</h1>
                <p>At Ink Mart we supply High-Quality Reliable Copiers, High Volume Copiers, Faxes, Laser Printers, Wide Format Machines, Duplicators, Office Furniture, Stationery, Consumables, Telecommunications and all related Services in Limpopo.</p>
                <p>Ink Mart was established in 2016, and since then we have been specializing in these fields, and have been able to provide quality reliable products and services to a large number of clients in various fields.</p>
                <p>As well as servicing the educational market Ink Mart also supplies consumables and stationary to commercial clients throughout Limpopo and prides itself on its business model that matches reasonable pricing with reliable deliveries</p>
                <p>Buy high-quality brand name Office Machines and Toner cartridges for laser and inkjet printers at low discount prices at INK MART.</p>
            </div>
            <div class="about-img"><img src="https://img.freepik.com/free-photo/advisor-agent-sitting-desk-table-startup-office-analyzing-financial-graphs-report-typing-company-strategy-african-american-businessman-working-overtime-investment-report-business-concept_482257-66470.jpg?t=st=1728705044~exp=1728708644~hmac=09249d25df7b873825d535fe44d50e9fd6a3c3294eb16141e8ab303e8cac9bf7&w=826" alt=""></div>
        </div>
        <div class="container index_1">
            <div class="about-img"><img src="https://img.freepik.com/free-photo/advisor-agent-sitting-desk-table-startup-office-analyzing-financial-graphs-report-typing-company-strategy-african-american-businessman-working-overtime-investment-report-business-concept_482257-66470.jpg?t=st=1728705044~exp=1728708644~hmac=09249d25df7b873825d535fe44d50e9fd6a3c3294eb16141e8ab303e8cac9bf7&w=826" alt=""></div>
            <div class="welcome about-edit">
                <h1 class="indexHeading">Services</h1>
                <p>At Ink Mart we supply High-Quality Reliable Copiers, High Volume Copiers, Faxes, Laser Printers, Wide Format Machines, Duplicators, Office Furniture, Stationery, Consumables, Telecommunications and all related Services in Limpopo. Buy high-quality brand name Office Machines and Toner cartridges for laser and inkjet printers at low discount prices at INK MART.At Ink Mart we strive to build long-term relationships through honesty and hard work that benefits both us and our client base.</p>
            </div>
        </div>
        <div class="container index_1">
            <div class="welcome about-edit">
                <h1 class="indexHeading">Mission</h1>
                <p>Our Mission is guided by our core values and founded on outstanding service INK MART strives to be recognized as the TOP choice provider of office machinery and supplies in Limpopo.</p>
                <p>At Ink Mart we strive to build long-term relationships through honesty and hard work that benefits both us and our client base.</p>
            </div>
            <div class="about-img"><img src="https://img.freepik.com/free-photo/advisor-agent-sitting-desk-table-startup-office-analyzing-financial-graphs-report-typing-company-strategy-african-american-businessman-working-overtime-investment-report-business-concept_482257-66470.jpg?t=st=1728705044~exp=1728708644~hmac=09249d25df7b873825d535fe44d50e9fd6a3c3294eb16141e8ab303e8cac9bf7&w=826" alt=""></div>
        </div>
        <div class="container index_1">
            <div class="about-img"><img src="https://img.freepik.com/free-photo/advisor-agent-sitting-desk-table-startup-office-analyzing-financial-graphs-report-typing-company-strategy-african-american-businessman-working-overtime-investment-report-business-concept_482257-66470.jpg?t=st=1728705044~exp=1728708644~hmac=09249d25df7b873825d535fe44d50e9fd6a3c3294eb16141e8ab303e8cac9bf7&w=826" alt=""></div>
            <div class="welcome about-edit">
                <h1 class="indexHeading">Vission</h1>
                <p>Is to be recognized as a leader in office Machinery and supplies by supplying the finest quality products at competitive prices, by ensuring that we can create an environment that is secure, functional, well supported, well sourced and innovative, and to reduce the risk of unnecessary challenges, and by providing an ethos which values each client as the key component to the success of INK MART regardless of stature. To provide training and support to our employees and that of customers in order to offer growth in service excellence.</p>
            </div>
        </div>
        `;
    }
}
