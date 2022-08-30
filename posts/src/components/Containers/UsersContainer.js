import axios from 'axios';
import { connect } from 'react-redux';
import {setCurrentPage, toogleIsFetching,setUsersData} from '../../redux/Reducers/usersReducer'
import React from 'react';
import Users from '../ClearComponents/Users';

class UsersContainerClass extends React.Component {
  componentDidMount () {
    this.getUsers(this.props.currentPage);
  }
  getUsers(page){
    this.props.toogleIsFetching(true);
    axios.get(`/api/users?pageIndex=${page}&pageSize=${this.props.pageSize}`).then(
      (res)=>this.props.setUsersData(res.data)
    ).then(
      ()=>this.props.toogleIsFetching(false)
    );
  }
  onPageChange(page){
    this.props.setCurrentPage(page);
     this.getUsers(page);
  }
  render(){
    return (
      <Users {...this.props} onPageChange={(page)=>this.onPageChange(page)} />
    )
  }
}

const mapStateToProps=(state)=>({
  users: state.users.users,
  isFetching: state.users.isFetching,
  currentPage: state.users.currentPage,
  pageSize: state.users.pageSize,
  total: state.users.total
})

const mapDispatchToProps={
  setCurrentPage,
  toogleIsFetching,
  setUsersData
}

const UsersContainer = connect(mapStateToProps,mapDispatchToProps)(UsersContainerClass);

export default UsersContainer;