class Icon {
  constructor (x, y, size, icon) {
      this.x = x;
      this.y = y;
      this.size  =  size;
      this.displayed = false;
      this.icon = icon;
  }

  doTask(user) {
    let d = dist(user.x,user.y,this.x,this.y)
    if(this.displayed & d < user.size/2 +,this.size/2) {
      return true;
    }
    else {
      return false;
    }
  }

  done(x,y) {
    this.x = x;
    this.y = y;
  }

  display() {
    if (this.displayed) {
      imageMode(CENTER);
      image(this.icon,this.x,this.y,this.size,this.size);
    }
  }
}
