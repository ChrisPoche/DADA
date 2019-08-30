import React from 'react';
import Objects from './Objects';

class App extends React.Component {
  state = {
    objects: [],
    size: null
  };
  componentDidMount() {
    let lastCall = 0;
    let delay = 100;
    window.addEventListener('keydown', (e) => {
      const now = (new Date).getTime();
      if (now - lastCall < delay) {
        return;
      }
      else {
        
        lastCall = now;
        // console.log('e',e);
        if (e.keyCode == 27) this.resetBackground(); // esc
        else if (e.keyCode == 77 && e.shiftKey == true && e.altKey == true) this.meltingDots(); // alt + shift + m
        else if (e.keyCode == 48 && e.shiftKey == true) this.setState(() => ({ size: null })); // shift + 0
        else if (e.keyCode == 38 && e.shiftKey == true) this.makeBigger(); // shift + up arrow
        else if (e.keyCode == 40 && e.shiftKey == true) this.makeSmaller(); // shift + down arrow
        else if (e.keyCode == 38 && e.shiftKey == false) this.makeNewBigger(); // up arrow
        else if (e.keyCode == 40 && e.shiftKey == false) this.makeNewSmaller(); // down arrow
        else if (e.keyCode != 16) this.createObject();
      }
    });
  };
  componentDidUpdate() {
    // console.log('state', this.state);
  }
  HSVtoRGB = (hue, saturation, value) => {
    var r, g, b;
    const hueInt = parseInt(hue * 6);
    const f = hue * 6 - hueInt;
    const p = value * (1 - saturation);
    const q = value * (1 - f * saturation);
    const t = value * (1 - (1 - f) * saturation);
    if (hueInt == 0) {
      r = value;
      g = t;
      b = p;
    }
    else if (hueInt == 1) {
      r = q;
      g = value;
      b = p;
    }
    else if (hueInt == 2) {
      r = p;
      g = value;
      b = t;
    }
    else if (hueInt == 3) {
      r = p;
      g = q;
      b = value;
    }
    else if (hueInt == 4) {
      r = t;
      g = p;
      b = value;
    }
    else if (hueInt == 5) {
      r = value;
      g = p;
      b = q;
    }
    return [parseInt(r * 256), parseInt(g * 256), parseInt(b * 256)].join();
  };
  colorChange = () => {
    var hue = (Math.random() + .618033988749895) % 1;
    var saturation = (Math.random() + .618033988749895) % 1;
    var rgb = this.HSVtoRGB(hue, saturation, .95);
    return rgb;
  }
  resetBackground = () => {
    this.setState(() => ({ objects: [] }))
    document.body.style.backgroundColor = 'white';
  }
  createObject = () => {
    var newObject;
    this.state.size ?
      newObject = [{
        backgroundColor: this.colorChange(),
        top: ((Math.random() * 100) + 1).toString() + '%',
        left: ((Math.random() * 100) + 1).toString() + '%',
        height: this.state.size,
        width: this.state.size
      }]
      : newObject = [{
        backgroundColor: this.colorChange(),
        top: ((Math.random() * 100) + 1).toString()-3.75 + 'vh',
        left: ((Math.random() * 100) + 1).toString()-3.75 + 'vw',
        height: '7.5vh',
        width: '7.5vh'
      }];
    this.setState(state => {
      const objects = [...state.objects, newObject];
      return {
        objects
      }
    })
  }
  meltingDots = () => {
    const objects = document.querySelectorAll('.object');
    var object = getComputedStyle(objects[0]);
    const height = (parseInt(object.height.slice(0, object.height.length - 2)) * 7.5).toString() + 'px';
    for (var i = 0; i < objects.length; i++) {
      objects[i].style.height = height;
    }
  }
  makeBigger = () => {
    const objects = document.querySelectorAll('.object');
    for (var i = 0; i < objects.length; i++) {
      var object = getComputedStyle(objects[i]);
      const height = (parseInt(object.height.slice(0, object.height.length - 2)) * 1.2).toString() < 2000 ? (parseInt(object.height.slice(0, object.height.length - 2)) * 1.2).toString() + 'px' : (parseInt(object.height.slice(0, object.height.length - 2))).toString() + 'px';
      objects[i].style.height = height;
      objects[i].style.width = height;
    }
  }
  makeSmaller = () => {
    const objects = document.querySelectorAll('.object');
    for (var i = 0; i < objects.length; i++) {
      var object = getComputedStyle(objects[i]);
      const height = (parseInt(object.height.slice(0, object.height.length - 2)) / 1.2) > 5 ? (parseInt(object.height.slice(0, object.height.length - 2)) / 1.2).toString() + 'px' : (parseInt(object.height.slice(0, object.height.length - 2))).toString() + 'px';
      objects[i].style.height = height;
      objects[i].style.width = height;
    }
  }
  makeNewBigger = () => {
    var height;
    if (this.state.size == null) {
      const object = getComputedStyle(document.querySelector('.object'));
      height = (parseInt(object.height.slice(0, object.height.length - 2)) * 1.2).toString() + 'px';
    }
    else {
      height = (parseInt(this.state.size.slice(0, this.state.size.length - 2)) * 1.2).toString() < 2000 ? (parseInt(this.state.size.slice(0, this.state.size.length - 2)) * 1.2).toString() + 'px' : (parseInt(this.state.size.slice(0, this.state.size.length - 2))).toString() + 'px';
    }
    this.setState(() => ({ size: height }))
  }
  makeNewSmaller = () => {
    var height;
    if (this.state.size == null) {
      const object = getComputedStyle(document.querySelector('.object'));
      height = (parseInt(object.height.slice(0, object.height.length - 2)) / 1.2).toString() + 'px';
    }
    else {
      height = (parseInt(this.state.size.slice(0, this.state.size.length - 2)) / 1.2) > 5 ? (parseInt(this.state.size.slice(0, this.state.size.length - 2)) / 1.2).toString() + 'px' : (parseInt(this.state.size.slice(0, this.state.size.length - 2))).toString() + 'px';
    }
    this.setState(() => ({ size: height }))
  }
  render() {
    return (
      <div id='container'>
        {this.state.objects.length > 0 && this.state.objects.map((object, index) => (<Objects id={index + 1} key={'' + index} style={object} />))}
      </div>
    )
  };
};

export default App;


//https://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/