import React, { useState } from 'react';
import styled from 'styled-components';

function Nav ({searchProduct, navBar}) {
  const [search, setSearch] = useState();
  const [dropdown, setDropdown] = useState(0);
  const dropdownOptions = ['none', 'block'];

  function changeSearch (e) {
    setSearch(e.target.value);
  };

  function clickHandler () {
    searchProduct(search.toLowerCase());
  }

  function showDropdown (e, cat) {
    document.getElementById(cat).style.display = 'block';
  }

  return (
    <NavContainer>
      <Navi>
        <NavHeader>Wolverine</NavHeader>
        <Menu>{Object.keys(navBar).map((cat)=>
        <Cat onClick = {(e) => showDropdown(e, cat)} >
          <DropButton>{cat}</DropButton>
          <Dropdown id ={cat}>
            {navBar[cat].map((product)=><List >{product['name']}</List>)}
          </Dropdown>
        </Cat>)}
      </Menu>
        <NavCart>
          <span className ="material-symbols-outlined">shopping_cart_checkout</span>
        </NavCart>
        <NavSearch>
          <input value = {search} onChange = {changeSearch}></input>
          <button onClick = {clickHandler} className = 'search-button'>🔍</button>
        </NavSearch>
      </Navi>

    </NavContainer>
  )
}

export default Nav;

const NavContainer = styled.div`
  margin: 10px 40px 40px 80px;
  height: 70px;
  z-index: 1;
`;

const Navi = styled.div`
  width: 100%;
  display: inline-block;
  background-color: #c1ade5;
  font-family: 'Courier New', Courier, monospace;
  border-radius: 1%;
  height: 70px;
`;

const NavHeader = styled.h2`
  margin-left: 30px;
  float: left;
`;

const Menu = styled.div`
  margin: 10px 0px 20px 10px;
  width: 600px;
  float: left;
`;

const Cat = styled.div`
  float: left;
  margin-left: 20px;
  font-size: 18px;
  overflow: hidden;
`;

const DropButton = styled.button`
  cursor: pointer;
  font-size: 16px;
  border: none;
  outline: none;
  padding: 15px 16px;
  font-family: 'Courier New', Courier, monospace;
  background-color: #c1ade5;
  margin: 0;
`;

const Dropdown = styled.div`
  display: none;
  position: absolute;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 500;
`;

const List = styled.a`
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
`;

const NavSearch = styled.div`
  margin-top: 20px;
  float: right;
  margin-left: 50px;
`;

const NavCart = styled.div`
  margin-top: 20px;
  float: right;
  margin-left: 50px;
  margin-right: 50px;
`;