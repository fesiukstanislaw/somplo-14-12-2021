import {
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewRef
} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  @ViewChild('vc', {read: ViewContainerRef}) vc: ViewContainerRef;

  @ViewChild('tpl', {read: TemplateRef}) tpl: TemplateRef<any>;

  title = 'Somplo';
  image = '';
  url = '';
  option = '';
  imageView = '';
  form: FormGroup;
  childViewRef: ViewRef;
  display = false;

  constructor(public fb: FormBuilder, private renderer: Renderer2, private el: ElementRef) {
    this.form = this.fb.group({
      image: new FormControl(
        Validators.required
      ),
      url: new FormControl('',
        Validators.required),
      animation: new FormControl('left-right')
    });
  }

  ngAfterViewInit(){
    this.childViewRef = this.tpl.createEmbeddedView(null);
  }


  onPress() {
    if (this.form.controls['url'].errors?.['required'] !== true) {
      this.removeChildView();
      this.url = this.form.controls['url'].value;
      this.option = this.form.controls['animation'].value;
      this.imageView = this.image;
      this.insertChildView();
      this.display = true;
    }
  }

  insertChildView(){
    this.vc.insert(this.childViewRef);
  }

  removeChildView(){
    this.vc.detach();
  }

  show(event): void{
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      image: file
    });

    const reader = new FileReader();
    reader.onload = () => {
      this.image = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
