# form-element-duplicator
Vanilla js form element duplicator

# Kullanım
Sayfanıza ekleyin
```html
<script src="form-element-duplicator.min.js"></script>
```

Çoğaltmak istediğiniz input / select için bir çoğaltma butonu ekleyin
```html
<button type="button" onclick="duplicator.add({ selector: `[name='phone[]']`, maxCount: 10 })">Add</button>
```

Selector olarak querySelector'e verilebilecek tüm parametreler çalışacaktır. Class select, id select, attribute select gibi selectorler kullanılabilir.

# Seçenekler
```json5
{
  target: '.url-inputs', // çoğaltılmış elementlerin ekleneceği alan
  maxCount: -1, // -1 limitsiz
  selector: '[name="phone[]"]', // çoğaltılacak element
  removeButton: { // obje yerine, gizlemek için boolean false alabilir
    style: '', // çoğaltılan elementlerin yanına eklenecek silme butonu stili
    text: '', // silme butonu için yazı
    html: '' // silme butonunun içi için html, bu kullanılırsa text görmezden gelinir
  }
}
```

