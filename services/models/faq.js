
class faq {
    constructor(id, question, answer, createdDate, updatedDate) {
        this.id = id
        this.question = question
        this.answer = answer
        this.createdDate = createdDate
        this.updatedDate = updatedDate
    }
}

// faq.question = "ffff"
// const test = new faq(req.boody.question, req.boody.answer)

module.exports = faq