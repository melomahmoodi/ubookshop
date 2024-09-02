
export const Block = props => {


    if (!props.state.cart) {
        props.state.cart = []
    }



    return <c-c style={{ width: 150, flex: 1, minWidth: 150, position: "relative",
    backgroundColor:"#8FA9A6", borderRadius:5, margin:"5px 7px", boxShadow:"  0px 0px 7px -5px rgba(255,255,255,1)" }} >

        <img
            className={global.styles.hover}
            src={props.book.imageLink}
            style={{ width: "100%", 
                height: 200,
                 objectFit: "fill",
                 minWidth: 150,
                 borderTopLeftRadius: 5 ,
                  borderTopRightRadius:5 }}
            onClick={() => {
                props.state.form = "bookspecs"
                props.state.book = props.book
                props.refresh()
            }} />


        <f-cc style={{padding:"5px 0",width:"100%", height:40}}>

            <f-13>{props.book.title}</f-13></f-cc>

        <f-csb style={{ width: "100%", padding:"5px 0"}}>
           
           
            <c-x style={{direction:"ltr",margin:"0 10px"}}>

             <f-13><del>{props.book.price as number}   T</del> </f-13>

                <f-15>{props.book.price *0.8 as number } T</f-15>
            </c-x>



          <img src={props.state.cart.includes(props.book.title)?
          "https://cdn.turing.team/research/65/check-mark.png":
          "https://cdn.turing.team/research/65/shopping-cart.png"}
          style={{height:30,
            width:30,objectFit:"contain", margin:"0 10px"}}/>



        </f-csb>




    </c-c>
}








{/* 
        {props.state.faves.includes(props.book.title) ? <img src="https://irmapserver.ir/research/65/heart.png"
            style={{
                height: 30, width: 30, objectFit: "contain",
                position: "absolute", bottom: 10, right: 10
            }} /> : null}ّ */}
