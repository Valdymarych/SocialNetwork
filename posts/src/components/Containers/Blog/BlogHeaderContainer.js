import { connect } from "react-redux";
import BlogHeader from "../../ClearComponents/Blog/BlogHeader";


const mapStateToProps = (state)=>({
  name: state.regLog.logined.name
})


const mapDispatchToProps = {
}


const BlogHeaderContainer = connect(mapStateToProps,mapDispatchToProps)(BlogHeader);

export default BlogHeaderContainer;