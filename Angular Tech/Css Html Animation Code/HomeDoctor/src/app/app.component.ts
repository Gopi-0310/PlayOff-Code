import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as faceapi from 'face-api.js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data:any;
  @ViewChild('video', {static: true}) video!: ElementRef;
  @ViewChild('canvas', { static: true })
  canvas!: ElementRef;
  isRecognized: boolean = false;
  ngOnInit(): void {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
    ]).then(this.startVideo)
    .catch(error => console.error(error));
  }

  startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: {} })
      .then(stream => {
        this.video.nativeElement.srcObject = stream;
      })
      .catch(error => console.error(error));
  }

  recognizeFace = async () => {
    const videoEl = this.video.nativeElement;
    const canvasEl = this.canvas.nativeElement;
    const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 });
    const detection = await faceapi.detectSingleFace(videoEl, options).withFaceLandmarks().withFaceDescriptor();
    
    if (detection) {
      const descriptors = [detection.descriptor];
      const labeledDescriptors = await this.loadLabeledImages();
      const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);
      const match = faceMatcher.findBestMatch(detection.descriptor);

      if (match.label) {
        this.isRecognized = true;
      }
    }

    requestAnimationFrame(() => this.recognizeFace());
  }

  loadLabeledImages = async () => {
    const labels = ['John Doe', 'Jane Doe'];
    return Promise.all(
      labels.map(async label => {
        const descriptions = [];
        for (let i = 1; i <= 2; i++) {
          const img = await faceapi.fetchImage(`/assets/images/${label}/${i}.jpg`);
          const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
          if (detections) {
            descriptions.push(detections.descriptor);
          }
        }
        return new faceapi.LabeledFaceDescriptors(label, descriptions);
      })
    );
  }
}
