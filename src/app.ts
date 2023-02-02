function autobind(
    _: any,
    _2: string,
    descriptor: PropertyDescriptor
    ){
    const originalMethod = descriptor.value
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get(){
            const boundFn = originalMethod.bind(this)
            return boundFn
        }
    }
    return adjDescriptor
}

class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    formEl: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true)
        this.formEl = importedNode.firstElementChild as HTMLFormElement
        this.formEl.id = 'user-input'

        this.titleInputElement = this.formEl.querySelector('#title') as HTMLInputElement
        this.descriptionInputElement = this.formEl.querySelector('#description') as HTMLInputElement
        this.peopleInputElement = this.formEl.querySelector('#people') as HTMLInputElement

        this.configure()
        this.attach()
    }

    private gatherUserInput(): [string, string, number] | void{
        const enteredTitle = this.titleInputElement.value
        const enteredDescription = this.descriptionInputElement.value
        const enteredPeople = this.peopleInputElement.value     
        
        return [enteredTitle, enteredDescription, +enteredPeople]
    }

    private clearInputs() {
        this.titleInputElement.value = ''
        this.descriptionInputElement.value = ''
        this.peopleInputElement.value = ''
    }

    @autobind
    private submitHandler(event: Event) {  
        event.preventDefault()
        const userInput = this.gatherUserInput()
        if (Array.isArray(userInput)){
            const [user, desc, people] = userInput
            console.log(user, desc, people)
            this.clearInputs()
        }
    }

    private configure() {
        this.formEl.addEventListener('submit', this.submitHandler)
    }

    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.formEl)
    }
}

const prjInput = new ProjectInput()