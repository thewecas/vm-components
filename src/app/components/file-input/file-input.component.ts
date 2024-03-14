import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { TooltipDirective } from '../../directives/tooltip/tooltip.directive';
import { FileNamePipe } from '../../pipes/filename.pipe';

@Component({
  selector: 'app-file-input',
  standalone: true,
  imports: [FileNamePipe, CommonModule, TooltipDirective],
  templateUrl: './file-input.component.html',
  styleUrl: './file-input.component.scss',
})
export class FileInputComponent implements AfterViewInit {
  fileList: File[] = [

  ];
  dropBoxhighLight = false;

  @Input('fileTypes') allowedFileTypes: string[]=[];
  @Input('multiple') allowMultiple: boolean=true;
  @Input('totalFiles') allowedTotalNoFiles!: number;

  @ViewChild('input') inputEle!: ElementRef<HTMLInputElement>;
  @ViewChildren('.draggable') draggableEles!: ElementRef<HTMLDivElement>[];
  @ViewChild('.input-wrapper') container!: ElementRef<HTMLDivElement>[];

  ngAfterViewInit(): void {
    this.inputEle.nativeElement.multiple =
      this.allowMultiple || !!this.allowedTotalNoFiles;
    if (this.allowedFileTypes) {
      let filetypes;
      filetypes = this.allowedFileTypes.join(',');
      this.inputEle.nativeElement.accept = filetypes;
    }
  }

  updateFiles(files: FileList | null) {
    if (files) {
      this.filterAllowedFiles([...files]);
    }
  }

  removeFile(event: Event, index: number) {
    event.stopPropagation();
    this.fileList.splice(index, 1);
  }
  handleFileDrop(event: DragEvent) {
    console.log('Files Dropped');

    event.preventDefault();
    // if (event.dataTransfer?.items) {
    //   const fileList: File[] = [];
    //   [...event.dataTransfer.items].map((item) => {
    //     if (item.kind == 'file') {
    //       const file = item.getAsFile();
    //       if (file) fileList.push(file);
    //     }
    //   });
    //   console.log('FILES ', fileList);

    //   this.filterAllowedFiles(fileList);
    // }
    // if (event.dataTransfer?.files) {
    //   this.filterAllowedFiles([...event.dataTransfer.files]);
    //   console.log('FILES2 ', [...event.dataTransfer.files]);
    // } else console.log('Cannot Use Drag And drop');
  }

  filterAllowedFiles(fileList: File[]) {
    const fileTypeRegexArray = this.getFileTypeRegexArray();
    const allowedFiles = [...this.fileList, ...fileList].filter((file) =>
      fileTypeRegexArray.some((regex) => !!file.type.match(regex))
    );
    if (this.allowMultiple || !!this.allowedTotalNoFiles) {
      if (
        !!this.allowedTotalNoFiles &&
        this.allowedTotalNoFiles < allowedFiles.length
      )
        allowedFiles.splice(this.allowedTotalNoFiles);
    } else allowedFiles.splice(0);

    this.filterDupliates(allowedFiles);
  }

  log(ele: any) {
    console.log(ele);
  }

  getFileTypeRegexArray(): RegExp[] {
    const regexArray: RegExp[] = [];
    if (Array.isArray(this.allowedFileTypes))
      this.allowedFileTypes.forEach((fileType) => {
        regexArray.push(this.getFileTypeRegex(fileType));
      });
    else regexArray.push(this.getFileTypeRegex(this.allowedFileTypes));
    return regexArray;
  }

  getFileTypeRegex(fileType: string): RegExp {
    const [type, subType] = fileType.split('/');
    console.log(type, subType);
    const regex = RegExp(
      `${type}\/${subType == '*' || subType == '**' ? '.*' : subType}`
    );
    return regex;
  }

  filterDupliates(fileList: File[]) {
    const fileName: string[] = [];
    this.fileList = fileList.filter((file) => {
      if (fileName.includes(file.name)) return false;
      else {
        fileName.push(file.name);
        return true;
      }
    });
  }
  handleDragStart(ele: HTMLDivElement) {
    ele.classList.add('dragging');``
    console.log(ele.innerText);
  }
  handleDragEnd(ele: HTMLDivElement) {
    ele.classList.remove('dragging');
  }

  handleDragOver(event: DragEvent, ele: HTMLDivElement) {
    event.preventDefault();
    console.log(ele);

    const draggable: HTMLElement | null = document.querySelector('.dragging');

    // if (draggable) {
    //   // ele.appendChild(draggable);
    //   const afterElement = this.getDragAfterElement(draggable);
    //   console.log('AFTER ', afterElement);

    //   // const afterElement = this.getDragAfterElement(ele, ele.clientTop);
    //   // console.log(afterElement);
    // }

    // if (draggable) ele.appendChild(draggable);
  }

  getDragAfterElement(container: HTMLElement) {
    let containerOffset = container.clientTop;
    const draggableElements = [
      ...document.querySelectorAll('.draggable:not(.dragging)'),
    ];
    // console.log('Total Draggable Elements : ', draggableElements.length);
    if (draggableElements.length == 0) return null;

    let closest: { offset: number; element: null | Element } = {
      offset: Number.NEGATIVE_INFINITY,
      element: null,
    };
    return draggableElements.reduce((closest, ele) => {
      let box = ele.getBoundingClientRect();
      const offset = containerOffset - box.top - box.height / 2;
      console.log(offset);

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: ele };
      } else return closest;
    }, closest).element;

    // if (draggableEles.length == 0) return null;
    // let offset = Number.NEGATIVE_INFINITY;
    // let closestEle;
    // draggableEles.forEach((ele) => {
    //   const box = ele.getBoundingClientRect();
    //   let childOffset = containerOffset - box.top - box.height / 2;

    //   if (childOffset < 0 && childOffset > offset) {
    //     offset = childOffset;
    //     closestEle = ele;
    //   }
    // });

    // return closestEle;

    // return draggableEles.reduce(
    //   (closest, child) => {
    //     const box = child.getBoundingClientRect();
    //     const offset = containerOffset - box.top - box.height / 2;

    //     if (offset < 0 && offset > closest.offset) {
    //       return { offset: offset, element: child };
    //     } else return closest;
    //   },
    //   {
    //     offset:
    //       containerOffset -
    //       draggableEles[0].getBoundingClientRect().top -
    //       draggableEles[0].getBoundingClientRect().height / 2,
    //     element: draggableEles[0],
    //   }
    // ).element;
  }
}
