import React from 'react';

class Menu extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount = () => {
        let nav = document.getElementsByClassName('nav');
        let width = window.innerWidth - 70;
        for(let i = 0;i < nav.length; i++) {
            nav[i].style.left = `${width}px`;
            nav[i].addEventListener('transitionend', ()=>{
                nav[i].style.transition = 'all 0s linear';
            })
        }
    }
    expandMenu = () => {
        let button = document.getElementById('menu-button');
        let menu = document.getElementById('menu-body');
        if(button.className === 'expand') this.props.popUpPane('close');
        button.classList.toggle('expand');
        menu.classList.toggle('expand');
        menu.style = menu.className === 'expand' ? 'width:300px; height:300px; transform:translate(120px, -120px)': null;
        let nav = document.getElementsByClassName('nav');
        for(let i = 0;i < nav.length; i++) {
            let space = ((90/nav.length)*Math.PI)/180;
            // console.log(space)
            let X = -1*(130*Math.cos(i*space));
            let Y = (130*Math.sin(i*space));
            // console.log(nav[i],'X',X, 'Y',Y);
            if(menu.className === 'expand') {
                setTimeout(() => {
                    nav[i].style.opacity = '1';
                }, 350);
            }
            else {
                setTimeout(() => {
                    nav[i].style.opacity = null;
                    nav[i].style.transition = 'all .5s ease-in';
                }, 0);
            }
            nav[i].style.transform = menu.className === 'expand' ? `translate(${X}px, ${Y}px)` : null;
            nav[i].style.transition = menu.className === 'expand' ? null : null;
        }
    }
    render() {
        return (
            <div>
                <div id='menu-body'></div>
                <h2 onClick={() => this.props.popUpPane('text-help')} className='nav'>Help</h2>
                <h2 onClick={() => this.props.popUpPane('text-about')} className='nav'>About</h2>
                <div id='menu-button' onClick={this.expandMenu}>
                    <div className='menu-top'></div>                    
                    <div className='menu-mid'></div>                    
                    <div className='menu-bottom'></div>                    
                </div>
            </div>
        );
    }
}

export default Menu;