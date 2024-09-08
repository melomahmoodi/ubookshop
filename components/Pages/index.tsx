import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';
import css from "./css.module.css"
import "./css.module.css"
import WindowFloat from '../Libs/WindowFloat';
import { Block } from './Block';




export default p => Component(p, Page);
const Page: PageEl = (props, state:
  {

    form: string,
    book: {
      title: string, author: string,
      country: string, language: string,
      year: number, pages: number,
      imageLink: string, price: number
    },
    cart: Array<string>

  }, refresh, getProps) => {

  let styles = global.styles

  let total_price = 0

    if (!state.cart) {
       state.cart = []
    }


    for (let title of state.cart) {
      let book = props.books.find(b => b.title == title)
      if (book) {
        total_price += (book.price * 0.8)
      }
    }
  



  return (
    <div style={{ direction: "ltr", minHeight: "11vh", }}>
      <br-x />


      {state.form == "bookspecs" ? <WindowFloat
        title="Book Details" onclose={() => {
          delete state.form
          refresh()
        }}>


        <f-c>
          <f-15>Title:</f-15>
          <sp-2 />
          <f-15>{state.book.title}</f-15>
        </f-c>



        <f-c>
          <f-15>Author: </f-15>
          <sp-2 />
          <f-15>{state.book.author}</f-15>
        </f-c>




        <f-c>
          <f-15>Country: </f-15>
          <sp-2 />
          <f-15>{state.book.country}</f-15>
        </f-c>


        <f-c>
          <f-15>Language:</f-15>
          <sp-2 />
          <f-15>{state.book.language}</f-15>
        </f-c>


        <f-c>
          <f-15>Year:</f-15>
          <sp-2 />
          <f-15>{state.book.year}</f-15>
        </f-c>



        <f-c>
          <f-15>Pages:</f-15>
          <sp-2 />
          <f-15>{(state.book.pages as number).toLocaleString("fa-IR")}</f-15>
        </f-c>


        <g-b style={{
          backgroundColor:

            state.cart.includes(state.book.title) ? "firebrick" : "#83C0B8"
        }}
          onClick={() => {
            if (state.cart.includes(state.book.title)) {
              state.cart = state.cart.filter(bookname => state.book.title != bookname)
              state.form = null
              refresh()
            }
            else {
              state.cart.push(state.book.title)
              state.form = null
              refresh()
            }
          }}>


          {state.cart.includes(state.book.title) ? <f-13>Delete</f-13> : <f-13>Buy</f-13>}
        </g-b>





      </WindowFloat> : null}
      <Window title="سبد خرید" style={{ height: 87, margin: 10, width: "calc(100% - 20px)" }}>

        <f-cse style={{ backgroundColor: "#8FA9A6", height: 77, width: "100%" }}>
          <f-15> TOTAL PRICE:{total_price}   T </f-15>
          <f-15> BOOK IN CART:{state.cart.length} </f-15>
        </f-cse>
      </Window>
      <Window title={"خوش آمدید"} style={{ minHeight: 200, margin: 10, width: "calc(100% - 20px)" }}>
        {/* <pre style={{ direction: "ltr" }}>{JSON.stringify(props, null, 2)}</pre> */}
        <c-c style={{ backgroundColor: "darkslategray", width: "100%" }}>
          <br-x />
          <w-cse style={{}}>
            {props.books.map(book => {
              return <Block
                book={book}
                state={state}
                refresh={refresh} />

            })}
          </w-cse>


        </c-c>


      </Window>


    </div>
  )
}


export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;



  let books = await global.db.collection("books").find({}).toArray()

  for (let book of books) {
    book.imageLink = "https://cdn.ituring.ir/research/ex/books/" + book.imageLink
  }

  console.log(books)


  return {
    props: {
      data: global.QSON.stringify({
        session,
        books,
        // nlangs,
      })
    },
  }
} 