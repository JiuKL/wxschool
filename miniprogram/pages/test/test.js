Page({
  data: {
    gallery: false,
    pics:[
      'cloud://msgid.6d73-msgid-1259714111/show/北京大学/北京大学_pic1.jpg',
      'cloud://msgid.6d73-msgid-1259714111/show/北京大学/北京大学_pic2.jpg',
      'cloud://msgid.6d73-msgid-1259714111/show/北京大学/北京大学_pic3.jpg',
      'cloud://msgid.6d73-msgid-1259714111/show/北京大学/北京大学_pic4.jpg',
    ]
  },
  close: function () {
    this.setData({
      gallery: false,
    });
  },
  open: function () {
    this.setData({
      gallery: true
    });
  },
});
