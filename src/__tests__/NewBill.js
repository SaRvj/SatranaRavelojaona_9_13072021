// /**
//  * @jest-environment jsdom
//  */

//  import '@testing-library/jest-dom'
//  import { screen,fireEvent, getByTestId} from "@testing-library/dom"
//  import NewBillUI from "../views/NewBillUI.js"
//  import NewBill from "../containers/NewBill.js"
//  import BillsUI  from '../views/BillsUI.js'
//  import {localStorageMock } from '../__mocks__/localStorage.js'
//  import { ROUTES ,ROUTES_PATH} from '../constants/routes.js'
//  import Router from "../app/Router.js"
//  import store from "../__mocks__/store.js"


//  describe("Given I am connected as an employee", () => {
//   describe("When I am on NewBill Page", () => {
//     test("Then mail icon in vertical layout should be highlighted",()=>{
//       window.localStorage.setItem('user', JSON.stringify({type: 'Employee'}))// défini l'user en tant qu'employé dans le local storage
//       Object.defineProperty(window, "location", { value: { hash: ROUTES_PATH['NewBill'] } });// défini l'url comme étant '#employee/bill/new'
//       document.body.innerHTML = `<div id="root"></div>` // crée le noeud pour que le router injecte l'objet correspondant à l'url
//       Router();//lance le router
//       expect(screen.getByTestId('icon-mail').classList.contains('active-icon')).toBe(true) // vérifie si l'icone est en surbrillance
//     })
//     test("Then Envoyer une note de frais displayed", () => {
//       const html = NewBillUI()
//       document.body.innerHTML = html
//       //to-do write assertion
//       expect(screen.getAllByText('Envoyer une note de frais')).toBeTruthy()
//     })

//     test('Then, I submit form-new-bill, handleSubmit called',()=>{
//       const html = NewBillUI()
//       document.body.innerHTML = html
      
//       const onNavigate = (pathname) => {
//         document.body.innerHTML = ROUTES({ pathname })
//       }
      
//       //modifie le localStorage par le localStorageMock
//       Object.defineProperty(window, 'localStorage', { value: localStorageMock })
//       window.localStorage.setItem('user', JSON.stringify({type: 'Employee'}))
      
      
//       const newBill = new NewBill({document, onNavigate})
//       expect(newBill).toBeDefined()
//       const handleSubmit = jest.fn(newBill.handleSubmit)
//       const newBillform = screen.getByTestId("form-new-bill")
//       newBillform.addEventListener('submit', handleSubmit)
//       fireEvent.submit(newBillform)
//       expect(handleSubmit).toHaveBeenCalled()
      
//     })

//     test('Then, I click on Justificatif, handleChangeFile called',()=> {
//       const html = NewBillUI()
//       document.body.innerHTML = html  
//       const onNavigate = (pathname) => {
//         document.body.innerHTML = ROUTES({ pathname })
//       }
      
//       //modifie le localStorage par le localStorageMock
//       Object.defineProperty(window, 'localStorage', { value: localStorageMock })
//       window.localStorage.setItem('user', JSON.stringify({type: 'Employee'}))
//       let store = jest.fn()
//       let localStorage = window.localStorage
//       const newBill = new NewBill({document, onNavigate, store , localStorage})
//       const handleChangeFile = jest.fn(newBill.handleChangeFile)
//       const fileBtn = screen.getByTestId('file')
//       expect(fileBtn).toBeDefined()
//       fileBtn.addEventListener('click', handleChangeFile)
//       fireEvent.click(fileBtn)
//       expect(handleChangeFile).toHaveBeenCalled()


//     })

//   })
// })
// describe("When I select a file", () => {
//   test("Then it should be changed in the input", () => {
//     Object.defineProperty(window, 'localStorage', { value: localStorageMock })// Set localStorage
//     window.localStorage.setItem('user', JSON.stringify({type: 'Employee'}))// Set user as Employee in localStorage
//     const html = NewBillUI()
//     document.body.innerHTML = html
//     const newBill = new NewBill({
//       document,
//       onNavigate: (pathname) => document.body.innerHTML = ROUTES({ pathname }),
//       firestore: null,
//       localStorage: window.localStorage,
//       validFormat : true
//     })     

    
//     const handleChangeFile = jest.fn(newBill.handleChangeFile)
//     const inputFile = screen.getByTestId("file")
//     inputFile.addEventListener('change', handleChangeFile)
//     fireEvent.change(inputFile, {
//       target: {
//         files: [new File(["test.jpeg"], "test.jpeg", { type: "image/jpeg" })]
//       }
//     })
//     expect(handleChangeFile).toHaveBeenCalled();
//     expect(inputFile.files[0].name).toBe("test.jpeg");
//   })
// })
// //test d'intégration POST
// describe("Given I am a user connected as Admin", () => {
//   describe("When I navigate to Dashboard", () => {
//     test("fetches bills from mock API POST", async () => {
//       const html = NewBillUI()
//       document.body.innerHTML = html  
//       const onNavigate = (pathname) => {
//         document.body.innerHTML = ROUTES({ pathname })
//       }      
//      const testBill = 
//       {
//         "id": "qcCK3SzECmaZAGRrHjaC",
//         "status": "refused",
//         "pct": 20,
//         "amount": 200,
//         "email": "a@a",
//         "name": "test2",
//         "vat": "40",
//         "fileName": "preview-facture-free-201801-pdf-1.jpg",
//         "date": "2002-02-02",
//         "commentAdmin": "pas la bonne facture",
//         "commentary": "test2",
//         "type": "Restaurants et bars",
//         "fileUrl": "https://test.storage.tld/v0/b/billable-677b6.a…f-1.jpg?alt=media&token=4df6ed2c-12c8-42a2-b013-346c1346f732"
//       }      
      
//        const getSpy = jest.spyOn(store, "post") //fonction simulée qui surveille l'appel de la méthode post de l'objet store       
//        const bills = await store.post(testBill) 
//        expect(getSpy).toHaveBeenCalledTimes(1)
//        expect(bills.status).toBe(200)
//        expect(bills.data.status).toBe("refused")
//        expect(bills.data.id).toBe("qcCK3SzECmaZAGRrHjaC")
      

//     })
//     test("fetches bills from an API and fails with 404 message error", async () => {
//       store.post.mockImplementationOnce(() => //simule un rejet de la promesse
//         Promise.reject(new Error("Erreur 404"))
//       )
//       const html = BillsUI({ error: "Erreur 404" })
//       document.body.innerHTML = html
//       const message = await screen.getByText(/Erreur 404/)
//       expect(message).toBeTruthy()
//     })
//     test("fetches messages from an API and fails with 500 message error", async () => {
//       store.post.mockImplementationOnce(() =>
//         Promise.reject(new Error("Erreur 500"))
//       )
//       const html = BillsUI({ error: "Erreur 500" })
//       document.body.innerHTML = html
//       const message = await screen.getByText(/Erreur 500/)
//       expect(message).toBeTruthy()
//     })
//   })
// })

import { fireEvent, screen } from "@testing-library/dom"
import userEvent from "@testing-library/user-event"
import NewBill from "../containers/NewBill.js"
import NewBillUI from "../views/NewBillUI.js"
import BillsUI from "../views/BillsUI.js"
import {ROUTES_PATH } from "../constants/routes";
import "@testing-library/jest-dom/extend-expect";
import Router from "../app/Router.js";
import axios from "axios";
import AddBill from "../__mocks__/addBill"

jest.mock('axios');
describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    beforeEach(() => {
      const user = JSON.stringify({ 
          type: "Employee",
          email : 'a@a',
      });
      window.localStorage.setItem("user", user);

      const pathname = ROUTES_PATH["NewBill"];
      Object.defineProperty(window, "location", {
          value: {
              hash: pathname
          }
      });

      document.body.innerHTML = `<div id="root"></div>`;
      Router();
    });
    test("Then the select of expense-type is required", () => {
      const selectExpenseType = screen.getByTestId("expense-type");
      expect(selectExpenseType).toBeRequired();
    })
    test("Then the input of date is required", () =>{
      const inputDate = screen.getByTestId("datepicker");
      expect(inputDate).toBeRequired();
    })
    test("Then the input of amount is required", () =>{
      const inputAmount = screen.getByTestId("amount");
      expect(inputAmount).toBeRequired();
    })
    test("Then the input of pct is required", () =>{
      const inputPct = screen.getByTestId("pct");
      expect(inputPct).toBeRequired();
    })
    test("Then the input of Supporting documents is required", () =>{
      const inputFile = screen.getByTestId("file");
      expect(inputFile).toBeRequired();
    })
  
    describe("When I do not fill fields and I click on send button", () =>{
      test("Then It should renders NewBill page", () =>{
        const inputName = screen.getByTestId("expense-name");
        expect(inputName.getAttribute("placeholder")).toBe("Vol Paris Londres");
        expect(inputName.value).toBe("");

        const inputDate = screen.getByTestId("datepicker");
        expect(inputDate.value).toBe("");

        const inputAmount = screen.getByTestId("amount");
        expect(inputAmount.getAttribute("placeholder")).toBe("348");
        expect(inputAmount.value).toBe("");

        const inputVat = screen.getByTestId("vat");
        expect(inputVat.getAttribute("placeholder")).toBe("70");
        expect(inputVat.value).toBe("");

        const inputPct = screen.getByTestId("pct");
        expect(inputPct.getAttribute("placeholder")).toBe("20");
        expect(inputPct.value).toBe("");

        const inputComment = screen.getByTestId("commentary");
        expect(inputComment.value).toBe("");

        const inputFile = screen.getByTestId("file");
        expect(inputFile.value).toBe("");

        const form = screen.getByTestId("form-new-bill");
        userEvent.click(form);
        expect(screen.getByTestId("form-new-bill")).toBeTruthy();
      })
    });
    describe("when I select a file whose format is not accepted", () =>{
      test("Then the value of input's file  should be empty and an error message should be visible", () => {
        const newBill = new NewBill({
          document,
         
        });
        window.alert = jest.fn();
        const inputData = {
          file: "pdf.pdf",
        };

        const handleChangeFile = jest.fn(newBill.handleChangeFile);
        const inputFile = screen.getByTestId("file");
        inputFile.addEventListener("change", handleChangeFile);

        fireEvent.change(inputFile, {
          target: {
              files: [
                  new File(["image"], inputData.file, {
                      type: "application/pdf",
                  }),
              ],
          },
        });
        jest.spyOn(window, "alert");
        expect(window.alert).toHaveBeenCalled();
        expect(inputFile.value).toEqual("");
      });
    });

    describe("When I upload an image in file input", () => {
      test("Then the file name should be displayed into the input", () => {
        const html = NewBillUI();
        document.body.innerHTML = html;
        
        const onNavigate = (pathname) => {
          document.body.innerHTML = pathname
        };

        const newBill = new NewBill({ document, onNavigate, store: null, localStorage });
        const changeFile = jest.fn(newBill.handleChangeFile);
        const file = screen.getByTestId("file");
        
        file.addEventListener("change", changeFile);
        fireEvent.change(file, {
          target: {
            files: [new File(["test.jpg"], "test.jpg", { type: "image/jpg" })],
          },
        });

        expect(changeFile).toHaveBeenCalled();
        expect(file.files[0].name).toBe("test.jpg");
      });
    })
    describe("When click on submit button of form new bill", () => {
      test("Then should called handleSubmit function", () => {
        const html = NewBillUI();
        document.body.innerHTML = html;

        const store = null;
        const onNavigate = (pathname) => {
          document.body.innerHTML = pathname;
        };

        const newBill = new NewBill({ document, onNavigate, store, localStorage: window.localStorage });
        const newBillSubmitted = screen.getByTestId("form-new-bill");

        expect(newBillSubmitted).toBeTruthy();

        const handleSubmit = jest.fn(newBill.handleSubmit);
        newBillSubmitted.addEventListener("submit", handleSubmit);
        fireEvent.submit(newBillSubmitted);

        expect(handleSubmit).toHaveBeenCalled();
      });
      test("Then bill form is submitted", () => {
        const html = NewBillUI();
        document.body.innerHTML = html;

        const store = null;
        const newBill = new NewBill({ document, onNavigate, store, localStorage: window.localStorage });

        const createdBill = jest.fn(newBill.updateBill);
        const newBillSubmitted = screen.getByTestId("form-new-bill");

        newBillSubmitted.addEventListener("submit", createdBill);
        fireEvent.submit(newBillSubmitted);

        expect(createdBill).toHaveBeenCalled();
        expect(screen.getAllByText("Envoyer une note de frais")).toBeTruthy();
      });
    })
  });
})

// Test d'integration post
describe("When I am an user connected as Employee", () =>{
  describe("When I do fill required files in good format and I click on submit button", () =>{
    test("Then Add new bill to mock API POST", async () => {
      const addBill =[ 
        {
          email: 'a@a',
          type: 'Transports',
          name:  'Train Paris-Suisse',
          amount: '300€',
          date:  '2022-01-10',
          vat: 10,
          pct: 20,
          commentary: "",
          fileUrl: 'https://stockimage.com/image.png',
          fileName: 'image.png',
          status: 'pending'
        }];
      const resp = {data: addBill};
      axios.post.mockResolvedValue(resp);
      return AddBill.post().then(data => expect(data).toEqual(addBill));
      
    
    });
    
    test("fetches bills from an API and fails with 404 message error", async () => {
      axios.post.mockImplementationOnce(() =>
        Promise.reject(new Error("Erreur 404"))
      )
      const html = BillsUI({ error: "Erreur 404" })
      document.body.innerHTML = html
      const message = await screen.getByText(/Erreur 404/)
      expect(message).toBeTruthy()
    })
    test("fetches messages from an API and fails with 500 message error", async () => {
      axios.post.mockImplementationOnce(() =>
        Promise.reject(new Error("Erreur 500"))
      )
      const html = BillsUI({ error: "Erreur 500" })
      document.body.innerHTML = html
      const message = await screen.getByText(/Erreur 500/)
      expect(message).toBeTruthy()
    })
  })
})
