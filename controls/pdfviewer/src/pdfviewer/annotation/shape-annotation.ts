import {
    PdfViewer, PdfViewerBase, IRectangle, IPageAnnotations, IPoint, ICommentsCollection, IReviewCollection,
    AnnotationType as AnnotType, LineHeadStyle, ShapeLabelSettingsModel
} from '../../index';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { ColorPicker } from '@syncfusion/ej2-inputs';
import { PointModel } from '@syncfusion/ej2-drawings';
import { PdfAnnotationBase } from '../../diagram/pdf-annotation';
import { PdfAnnotationBaseModel } from '../../diagram/pdf-annotation-model';
import { PdfAnnotationType } from '../../diagram/enum';
import {AnnotationSelectorSettingsModel } from '../pdfviewer-model';
import { AnnotationSelectorSettings } from '../pdfviewer';

/**
 * @hidden
 */
export interface IShapeAnnotation {
    shapeAnnotationType: string;
    author: string;
    modifiedDate: string;
    subject: string;
    note: string;
    strokeColor: string;
    fillColor: string;
    opacity: number;
    bounds: IRectangle;
    thickness: number;
    borderStyle: string;
    borderDashArray: number;
    rotateAngle: string;
    isCloudShape: boolean;
    cloudIntensity: number;
    vertexPoints: PointModel[];
    lineHeadStart: string;
    lineHeadEnd: string;
    rectangleDifference: string[];
    isLocked: boolean;
    id: string;
    comments: ICommentsCollection[];
    review: IReviewCollection;
    annotName: string;
    position?: string;
    enableShapeLabel: boolean;
    labelContent: string;
    labelFillColor: string;
    labelBorderColor: string;
    fontColor: string;
    fontSize: number;
    labelBounds: IRectangle;
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    labelSettings?: ShapeLabelSettingsModel;
    // tslint:disable-next-line
    annotationSettings?: any;
    customData: object;
}

/**
 * @hidden
 */
export class ShapeAnnotation {
    private pdfViewer: PdfViewer;
    private pdfViewerBase: PdfViewerBase;
    /**
     * @private
     */
    public currentAnnotationMode: string;
    /**
     * @private
     */
    public lineOpacity: number;
    /**
     * @private
     */
    public arrowOpacity: number;
    /**
     * @private
     */
    public rectangleOpacity: number;
    /**
     * @private
     */
    public circleOpacity: number;
    /**
     * @private
     */
    public polygonOpacity: number;
    /**
     * @private
     */
    public lineFillColor: string;
    /**
     * @private
     */
    public arrowFillColor: string;
    /**
     * @private
     */
    public rectangleFillColor: string;
    /**
     * @private
     */
    public circleFillColor: string;
    /**
     * @private
     */
    public polygonFillColor: string;
    /**
     * @private
     */
    public lineStrokeColor: string;
    /**
     * @private
     */
    public arrowStrokeColor: string;
    /**
     * @private
     */
    public rectangleStrokeColor: string;
    /**
     * @private
     */
    public circleStrokeColor: string;
    /**
     * @private
     */
    public polygonStrokeColor: string;
    /**
     * @private
     */
    public lineThickness: number;
    /**
     * @private
     */
    public arrowThickness: number;
    /**
     * @private
     */
    public rectangleThickness: number;
    /**
     * @private
     */
    public circleThickness: number;
    /**
     * @private
     */
    public polygonThickness: number;
    /**
     * @private
     */
    public lineDashArray: number;
    /**
     * @private
     */
    public lineStartHead: LineHeadStyle;
    /**
     * @private
     */
    public lineEndHead: LineHeadStyle;
    /**
     * @private
     */
    public arrowDashArray: number;
    /**
     * @private
     */
    public arrowStartHead: LineHeadStyle;
    /**
     * @private
     */
    public arrowEndHead: LineHeadStyle;
    /**
     * @private
     */
    public shapeCount: number = 0;

    constructor(pdfviewer: PdfViewer, pdfViewerBase: PdfViewerBase) {
        this.pdfViewer = pdfviewer;
        this.pdfViewerBase = pdfViewerBase;
        this.lineFillColor = this.pdfViewer.lineSettings.fillColor ? this.pdfViewer.lineSettings.fillColor : '#ffffff00';
        this.lineStrokeColor = this.pdfViewer.lineSettings.strokeColor ? this.pdfViewer.lineSettings.strokeColor : '#ff0000';
        this.lineThickness = this.pdfViewer.lineSettings.thickness ? this.pdfViewer.lineSettings.thickness : 1;
        this.lineOpacity = this.pdfViewer.lineSettings.opacity ? this.pdfViewer.lineSettings.opacity : 1;
        this.lineDashArray = this.pdfViewer.lineSettings.borderDashArray ? this.pdfViewer.lineSettings.borderDashArray : 0;
        this.lineStartHead = this.pdfViewer.lineSettings.lineHeadStartStyle ? this.pdfViewer.lineSettings.lineHeadStartStyle : 'None';
        this.lineEndHead = this.pdfViewer.lineSettings.lineHeadEndStyle ? this.pdfViewer.lineSettings.lineHeadEndStyle : 'None';
        this.arrowFillColor = this.pdfViewer.arrowSettings.fillColor ? this.pdfViewer.arrowSettings.fillColor : '#ffffff00';
        this.arrowStrokeColor = this.pdfViewer.arrowSettings.strokeColor ? this.pdfViewer.arrowSettings.strokeColor : '#ff0000';
        this.arrowThickness = this.pdfViewer.arrowSettings.thickness ? this.pdfViewer.arrowSettings.thickness : 1;
        this.arrowOpacity = this.pdfViewer.arrowSettings.opacity ? this.pdfViewer.arrowSettings.opacity : 1;
        this.arrowDashArray = this.pdfViewer.arrowSettings.borderDashArray ? this.pdfViewer.arrowSettings.borderDashArray : 0;
        this.arrowStartHead = this.pdfViewer.arrowSettings.lineHeadStartStyle ? this.pdfViewer.arrowSettings.lineHeadStartStyle : 'Closed';
        this.arrowEndHead = this.pdfViewer.arrowSettings.lineHeadEndStyle ? this.pdfViewer.arrowSettings.lineHeadEndStyle : 'Closed';
        this.rectangleFillColor = this.pdfViewer.rectangleSettings.fillColor ? this.pdfViewer.rectangleSettings.fillColor : '#ffffff00';
        this.rectangleStrokeColor = this.pdfViewer.rectangleSettings.strokeColor ? this.pdfViewer.rectangleSettings.strokeColor : '#ff0000';
        this.rectangleThickness = this.pdfViewer.rectangleSettings.thickness ? this.pdfViewer.rectangleSettings.thickness : 1;
        this.rectangleOpacity = this.pdfViewer.rectangleSettings.opacity ? this.pdfViewer.rectangleSettings.opacity : 1;
        this.circleFillColor = this.pdfViewer.circleSettings.fillColor ? this.pdfViewer.circleSettings.fillColor : '#ffffff00';
        this.circleStrokeColor = this.pdfViewer.circleSettings.strokeColor ? this.pdfViewer.circleSettings.strokeColor : '#ff0000';
        this.circleThickness = this.pdfViewer.circleSettings.thickness ? this.pdfViewer.circleSettings.thickness : 1;
        this.circleOpacity = this.pdfViewer.circleSettings.opacity ? this.pdfViewer.circleSettings.opacity : 1;
        this.polygonFillColor = this.pdfViewer.polygonSettings.fillColor ? this.pdfViewer.polygonSettings.fillColor : '#ffffff00';
        this.polygonStrokeColor = this.pdfViewer.polygonSettings.strokeColor ? this.pdfViewer.polygonSettings.strokeColor : '#ff0000';
        this.polygonThickness = this.pdfViewer.polygonSettings.thickness ? this.pdfViewer.polygonSettings.thickness : 1;
        this.polygonOpacity = this.pdfViewer.polygonSettings.opacity ? this.pdfViewer.polygonSettings.opacity : 1;
    }

    /**
     * @private
     */
    // tslint:disable-next-line
    public renderShapeAnnotations(shapeAnnotations: any, pageNumber: number, isImportAcion?: boolean): void {
        if (shapeAnnotations) {
            if (shapeAnnotations.length >= 1) {
                // tslint:disable-next-line
                let shapeAnnots: any[] = this.pdfViewer.annotation.getStoredAnnotations(pageNumber, shapeAnnotations, '_annotations_shape');
                if (!shapeAnnots || isImportAcion) {
                for (let i: number = 0; i < shapeAnnotations.length; i++) {
                    // tslint:disable-next-line
                    let annotation: any = shapeAnnotations[i];
                    annotation.annotationAddMode = this.pdfViewer.annotationModule.findAnnotationMode(annotation, pageNumber, annotation.AnnotType);
                    let annotationObject: IShapeAnnotation = null;
                    this.shapeCount = this.shapeCount + 1;
                    if (annotation.ShapeAnnotationType) {
                        let vertexPoints: IPoint[] = null;
                        if (annotation.VertexPoints) {
                            vertexPoints = [];
                            for (let j: number = 0; j < annotation.VertexPoints.length; j++) {
                                let point: IPoint = { x: annotation.VertexPoints[j].X, y: annotation.VertexPoints[j].Y };
                                vertexPoints.push(point);
                            }
                        }
                        if (annotation.Bounds && annotation.EnableShapeLabel === true) {
                            // tslint:disable-next-line:max-line-length
                            annotation.LabelBounds = this.pdfViewer.annotationModule.inputElementModule.calculateLabelBoundsFromLoadedDocument(annotation.Bounds);
                            // tslint:disable-next-line:max-line-length
                            annotation.LabelBorderColor = annotation.LabelBorderColor ? annotation.LabelBorderColor : annotation.StrokeColor;
                            annotation.FontColor = annotation.FontColor ? annotation.FontColor : annotation.StrokeColor;
                            annotation.LabelFillColor = annotation.LabelFillColor ? annotation.LabelFillColor : annotation.FillColor;
                            annotation.FontSize = annotation.FontSize ? annotation.FontSize : 16;
                            // tslint:disable-next-line:max-line-length
                            annotation.LabelSettings = annotation.LabelSettings ? annotation.LabelSettings : this.pdfViewer.shapeLabelSettings;
                        }
                        // tslint:disable-next-line:max-line-length
                        annotation.AnnotationSelectorSettings = annotation.AnnotationSelectorSettings ? annotation.AnnotationSelectorSettings : this.pdfViewer.annotationSelectorSettings;
                        // tslint:disable-next-line:max-line-length
                        annotation.AnnotationSettings = annotation.AnnotationSettings ? annotation.AnnotationSettings : this.pdfViewer.annotationModule.updateAnnotationSettings(annotation);
                        // tslint:disable-next-line:max-line-length
                        annotationObject = {
                            id: 'shape' + this.shapeCount, shapeAnnotationType: annotation.ShapeAnnotationType, author: annotation.Author, modifiedDate: annotation.ModifiedDate, subject: annotation.Subject,
                            // tslint:disable-next-line:max-line-length
                            note: annotation.Note, strokeColor: annotation.StrokeColor, fillColor: annotation.FillColor, opacity: annotation.Opacity, thickness: annotation.Thickness, rectangleDifference: annotation.RectangleDifference,
                            borderStyle: annotation.BorderStyle, borderDashArray: annotation.BorderDashArray, rotateAngle: annotation.RotateAngle, isCloudShape: annotation.IsCloudShape,
                            // tslint:disable-next-line:max-line-length
                            cloudIntensity: annotation.CloudIntensity, vertexPoints: vertexPoints, lineHeadStart: annotation.LineHeadStart, lineHeadEnd: annotation.LineHeadEnd, isLocked: annotation.IsLocked, comments: this.pdfViewer.annotationModule.getAnnotationComments(annotation.Comments, annotation, annotation.Author), review: {state: annotation.State, stateModel: annotation.StateModel, modifiedDate: annotation.ModifiedDate, author: annotation.Author }, annotName: annotation.AnnotName,
                            bounds: { left: annotation.Bounds.X, top: annotation.Bounds.Y, width: annotation.Bounds.Width, height: annotation.Bounds.Height, right: annotation.Bounds.Right, bottom: annotation.Bounds.Bottom },
                            // tslint:disable-next-line:max-line-length
                            labelContent: annotation.LabelContent, enableShapeLabel: annotation.EnableShapeLabel, labelFillColor: annotation.LabelFillColor,
                            fontColor: annotation.FontColor, labelBorderColor: annotation.LabelBorderColor, fontSize: annotation.FontSize,
                            // tslint:disable-next-line:max-line-length
                            labelBounds: annotation.LabelBounds,  annotationSelectorSettings: this.getSettings(annotation), labelSettings: annotation.LabelSettings, annotationSettings: annotation.AnnotationSettings,
                            customData: this.pdfViewer.annotation.getCustomData(annotation)
                        };
                        let annot: PdfAnnotationBaseModel;
                        // tslint:disable-next-line
                        let vPoints: any[] = annotationObject.vertexPoints;
                        if (vertexPoints == null) {
                            vPoints = [];
                        }
                        // tslint:disable-next-line:max-line-length
                        annotation.AnnotationSelectorSettings = annotation.AnnotationSelectorSettings ? annotation.AnnotationSelectorSettings : this.pdfViewer.annotationSelectorSettings;
                        annot = {
                            // tslint:disable-next-line:max-line-length
                            id: 'shape' + this.shapeCount, shapeAnnotationType: this.getShapeType(annotationObject), author: annotationObject.author, modifiedDate: annotationObject.modifiedDate, annotName: annotationObject.annotName,
                            subject: annotationObject.subject, notes: annotationObject.note, fillColor: annotationObject.fillColor, strokeColor: annotationObject.strokeColor, opacity: annotationObject.opacity,
                            // tslint:disable-next-line:max-line-length
                            thickness: annotationObject.thickness, borderStyle: annotationObject.borderStyle, borderDashArray: annotationObject.borderDashArray.toString(), rotateAngle: parseFloat(annotationObject.rotateAngle.split('Angle')[1]), comments: annotationObject.comments, review: annotationObject.review,
                            isCloudShape: annotationObject.isCloudShape, cloudIntensity: annotationObject.cloudIntensity, taregetDecoraterShapes: this.pdfViewer.annotation.getArrowType(annotationObject.lineHeadEnd),
                            // tslint:disable-next-line:max-line-length
                            sourceDecoraterShapes: this.pdfViewer.annotation.getArrowType(annotationObject.lineHeadStart), vertexPoints: vPoints, bounds: { x: annotationObject.bounds.left, y: annotationObject.bounds.top, width: annotationObject.bounds.width, height: annotationObject.bounds.height },
                            pageIndex: pageNumber,
                            // tslint:disable-next-line:max-line-length
                            labelContent: annotation.LabelContent, enableShapeLabel: annotation.EnableShapeLabel, labelFillColor: annotation.LabelFillColor,
                            fontColor: annotation.FontColor, labelBorderColor: annotation.LabelBorderColor, fontSize: annotation.FontSize,
                            labelBounds: annotation.LabelBounds, annotationSelectorSettings: annotation.AnnotationSelectorSettings,
                            annotationSettings: annotationObject.annotationSettings, annotationAddMode: annotation.annotationAddMode
                        };
                        let addedAnnot: PdfAnnotationBaseModel = this.pdfViewer.add(annot as PdfAnnotationBase);
                        this.pdfViewer.annotationModule.storeAnnotations(pageNumber, annotationObject, '_annotations_shape');
                    }
                }
            }
            } else if (shapeAnnotations.shapeAnnotationType) {
                let annotationObject: IShapeAnnotation = this.createAnnotationObject(shapeAnnotations);
                this.pdfViewer.annotationModule.storeAnnotations(pageNumber, annotationObject, '_annotations_shape');
                this.pdfViewer.annotationModule.triggerAnnotationAdd(shapeAnnotations);
            }
        }
    }
    /**
     * @private
     */
    // tslint:disable-next-line
    public getSettings(annotation : any) : any {
        let selector: AnnotationSelectorSettingsModel = this.pdfViewer.annotationSelectorSettings;
        if (annotation.AnnotationSelectorSettings) {
            selector = annotation.AnnotationSelectorSettings;
        } else {
            selector = this.getSelector(annotation.ShapeAnnotationType, annotation.Subject);
        }
        return selector;
    }
    /**
     * @private
     */
    public setAnnotationType(type: AnnotType): void {
        let date: Date = new Date();
        this.pdfViewerBase.disableTextSelectionMode();
        let author: string = 'Guest';
        switch (type) {
            case 'Line':
                this.currentAnnotationMode = 'Line';
                // tslint:disable-next-line:max-line-length
                let modifiedDateLine: string = this.pdfViewer.lineSettings.modifiedDate ? this.pdfViewer.lineSettings.modifiedDate : date.toLocaleString();
                // tslint:disable-next-line:max-line-length
                author = (this.pdfViewer.annotationSettings.author !== 'Guest') ? this.pdfViewer.annotationSettings.author : this.pdfViewer.lineSettings.author ? this.pdfViewer.lineSettings.author : 'Guest';
                this.pdfViewer.drawingObject = {
                    // tslint:disable-next-line:max-line-length
                    shapeAnnotationType: this.setShapeType('Line'), fillColor: this.lineFillColor, notes: '', strokeColor: this.lineStrokeColor, opacity: this.lineOpacity,
                    thickness: this.lineThickness, modifiedDate: modifiedDateLine, borderDashArray: this.lineDashArray.toString(),
                    // tslint:disable-next-line:max-line-length
                    sourceDecoraterShapes: this.pdfViewer.annotation.getArrowType(this.lineStartHead.toString()), taregetDecoraterShapes: this.pdfViewer.annotation.getArrowType(this.lineEndHead.toString()),
                    author: author, subject: this.pdfViewer.lineSettings.subject, lineHeadStart: this.lineStartHead, lineHeadEnd: this.lineEndHead
                };
                this.pdfViewer.tool = 'Line';
                break;
            case 'Arrow':
                this.currentAnnotationMode = 'Arrow';
                // tslint:disable-next-line:max-line-length
                let modifiedDateArrow: string = this.pdfViewer.arrowSettings.modifiedDate ? this.pdfViewer.arrowSettings.modifiedDate : date.toLocaleString();
                author = (this.pdfViewer.annotationSettings.author !== 'Guest') ? this.pdfViewer.annotationSettings.author : this.pdfViewer.arrowSettings.author ? this.pdfViewer.arrowSettings.author : 'Guest';
                this.pdfViewer.drawingObject = {
                    shapeAnnotationType: this.setShapeType('Arrow'), opacity: this.arrowOpacity,
                    // tslint:disable-next-line:max-line-length
                    sourceDecoraterShapes: this.pdfViewer.annotation.getArrowType(this.arrowStartHead.toString()),
                    taregetDecoraterShapes: this.pdfViewer.annotation.getArrowType(this.arrowEndHead.toString()),
                    // tslint:disable-next-line:max-line-length
                    fillColor: this.arrowFillColor, strokeColor: this.arrowStrokeColor, notes: '', thickness: this.arrowThickness,
                    borderDashArray: this.arrowDashArray.toString(), author: author, subject: this.pdfViewer.arrowSettings.subject,
                    // tslint:disable-next-line:max-line-length
                    modifiedDate: modifiedDateArrow, lineHeadStart: this.arrowStartHead, lineHeadEnd: this.arrowEndHead
                };
                this.pdfViewer.tool = 'Line';
                break;
            case 'Rectangle':
                this.currentAnnotationMode = 'Rectangle';
                // tslint:disable-next-line:max-line-length
                let modifiedDateRect: string = this.pdfViewer.rectangleSettings.modifiedDate ? this.pdfViewer.rectangleSettings.modifiedDate : date.toLocaleString();
                // tslint:disable-next-line:max-line-length
                author = (this.pdfViewer.annotationSettings.author !== 'Guest') ? this.pdfViewer.annotationSettings.author : this.pdfViewer.rectangleSettings.author ? this.pdfViewer.rectangleSettings.author : 'Guest';
                this.pdfViewer.drawingObject = {
                    shapeAnnotationType: this.setShapeType('Rectangle'), strokeColor: this.rectangleStrokeColor,
                    fillColor: this.rectangleFillColor, opacity: this.rectangleOpacity, notes: '',
                    thickness: this.rectangleThickness, borderDashArray: '0', modifiedDate: modifiedDateRect,
                    author: author, subject: this.pdfViewer.rectangleSettings.subject
                };
                this.pdfViewer.tool = 'DrawTool';
                break;
            case 'Circle':
                this.currentAnnotationMode = 'Circle';
                // tslint:disable-next-line:max-line-length
                let modifiedDateCir: string = this.pdfViewer.circleSettings.modifiedDate ? this.pdfViewer.circleSettings.modifiedDate : date.toLocaleString();
                // tslint:disable-next-line:max-line-length
                author = (this.pdfViewer.annotationSettings.author !== 'Guest') ? this.pdfViewer.annotationSettings.author : this.pdfViewer.circleSettings.author ? this.pdfViewer.circleSettings.author : 'Guest';
                this.pdfViewer.drawingObject = {
                    shapeAnnotationType: this.setShapeType('Circle'), strokeColor: this.circleStrokeColor,
                    fillColor: this.circleFillColor, opacity: this.circleOpacity, notes: '',
                    thickness: this.circleThickness, borderDashArray: '0', modifiedDate: modifiedDateCir,
                    author: author, subject: this.pdfViewer.circleSettings.subject
                };
                this.pdfViewer.tool = 'DrawTool';
                break;
            case 'Polygon':
                this.currentAnnotationMode = 'Polygon';
                // tslint:disable-next-line:max-line-length
                let modifiedDatePolygon: string = this.pdfViewer.polygonSettings.modifiedDate ? this.pdfViewer.polygonSettings.modifiedDate : date.toLocaleString();
                // tslint:disable-next-line:max-line-length
                author = (this.pdfViewer.annotationSettings.author !== 'Guest') ? this.pdfViewer.annotationSettings.author : this.pdfViewer.polygonSettings.author ? this.pdfViewer.polygonSettings.author : 'Guest';
                this.pdfViewer.drawingObject = {
                    strokeColor: this.polygonStrokeColor, fillColor: this.polygonFillColor,
                    opacity: this.polygonOpacity, thickness: this.polygonThickness, borderDashArray: '0',
                    notes: '', author: author, subject: this.pdfViewer.polygonSettings.subject,
                    modifiedDate: modifiedDatePolygon, borderStyle: ''
                };
                this.pdfViewer.tool = 'Polygon';
                break;
        }
    }

    private setShapeType(shape: string): PdfAnnotationType {
        let shapeType: PdfAnnotationType;
        switch (shape) {
            case 'Line':
                shapeType = 'Line';
                break;
            case 'Circle':
                shapeType = 'Ellipse';
                break;
            case 'Square':
                shapeType = 'Rectangle';
                break;
            case 'Polyline':
                shapeType = 'Line';
                break;
            case 'Arrow':
                shapeType = 'LineWidthArrowHead';
                break;
        }
        return shapeType;
    }

    private getShapeType(shape: IShapeAnnotation): PdfAnnotationType {
        let shapeType: PdfAnnotationType;
        switch (shape.shapeAnnotationType) {
            case 'Line':
                shapeType = 'Line';
                break;
            case 'Circle':
                shapeType = 'Ellipse';
                break;
            case 'Square':
                shapeType = 'Rectangle';
                break;
            case 'Polyline':
                shapeType = 'Line';
                break;
            case 'Polygon':
                shapeType = 'Polygon';
                break;
        }
        // tslint:disable-next-line:max-line-length
        if ((shape.shapeAnnotationType === 'Line' || shape.shapeAnnotationType === 'Polyline') && (shape.lineHeadStart !== 'None' || shape.lineHeadEnd !== 'None')) {
            shapeType = 'LineWidthArrowHead';
        }
        return shapeType;
    }

    private getShapeAnnotType(shape: PdfAnnotationType): string {
        let shapeType: string;
        switch (shape) {
            case 'Line':
            case 'LineWidthArrowHead':
                shapeType = 'Line';
                break;
            case 'Rectangle':
                shapeType = 'Square';
                break;
            case 'Ellipse':
                shapeType = 'Circle';
                break;
            case 'Polygon':
                shapeType = 'Polygon';
                break;
        }
        return shapeType;
    }

    /**
     * @private
     */
    // tslint:disable-next-line
    public modifyInCollection(property: string, pageNumber: number, annotationBase: any): IShapeAnnotation {
        this.pdfViewerBase.isDocumentEdited = true;
        let currentAnnotObject: IShapeAnnotation = null;
        if (annotationBase) {
            if (property === 'bounds') {
               this.pdfViewer.annotationModule.stickyNotesAnnotationModule.updateAnnotationModifiedDate(annotationBase, true);
            }
        }
        let pageAnnotations: IShapeAnnotation[] = this.getAnnotations(pageNumber, null);
        if (pageAnnotations != null && annotationBase) {
            for (let i: number = 0; i < pageAnnotations.length; i++) {
                if (annotationBase.id === pageAnnotations[i].id) {
                    let date: Date = new Date();
                    if (property === 'bounds') {
                        if (pageAnnotations[i].shapeAnnotationType === 'Line') {
                            pageAnnotations[i].vertexPoints = annotationBase.vertexPoints;
                        } else if (pageAnnotations[i].shapeAnnotationType === 'Polygon') {
                            pageAnnotations[i].vertexPoints = annotationBase.vertexPoints;
                            // tslint:disable-next-line:max-line-length
                            pageAnnotations[i].bounds = { left: annotationBase.bounds.x, top: annotationBase.bounds.y, width: annotationBase.bounds.width, height: annotationBase.bounds.height, right: annotationBase.bounds.right, bottom: annotationBase.bounds.bottom };
                        } else {
                            // tslint:disable-next-line:max-line-length
                            pageAnnotations[i].bounds = { left: annotationBase.bounds.x, top: annotationBase.bounds.y, width: annotationBase.bounds.width, height: annotationBase.bounds.height, right: annotationBase.bounds.right, bottom: annotationBase.bounds.bottom };
                        }
                        if (pageAnnotations[i].enableShapeLabel === true && annotationBase.wrapper) {
                            let labelTop: number = 0;
                            let labelLeft: number = 0;
                            let labelWidth: number = 0;
                            let labelHeight: number = 24.6;
                            let labelMaxWidth: number = 151;
                            if (annotationBase.wrapper.bounds.width) {
                                // tslint:disable-next-line:max-line-length
                                labelWidth = (annotationBase.wrapper.bounds.width / 2);
                                labelWidth = (labelWidth > 0 && labelWidth < labelMaxWidth) ? labelWidth : labelMaxWidth;
                            }
                            if (annotationBase.wrapper.bounds.left) {
                                // tslint:disable-next-line:max-line-length
                                labelLeft = ( annotationBase.wrapper.bounds.left + (annotationBase.wrapper.bounds.width / 2) - (labelWidth / 2) );
                            }
                            if (annotationBase.wrapper.bounds.top) {
                                // tslint:disable-next-line:max-line-length
                                labelTop = (annotationBase.wrapper.bounds.top + (annotationBase.wrapper.bounds.height / 2) - 12.3 );
                            }
                            // tslint:disable-next-line:max-line-length
                            pageAnnotations[i].labelBounds = { left: labelLeft, top: labelTop, width: labelWidth, height: labelHeight, right: 0, bottom: 0 };
                        }
                        pageAnnotations[i].modifiedDate = date.toLocaleString();
                    } else if (property === 'fill') {
                        pageAnnotations[i].fillColor = annotationBase.wrapper.children[0].style.fill;
                        pageAnnotations[i].modifiedDate = date.toLocaleString();
                    } else if (property === 'stroke') {
                        pageAnnotations[i].strokeColor = annotationBase.wrapper.children[0].style.strokeColor;
                        pageAnnotations[i].modifiedDate = date.toLocaleString();
                    } else if (property === 'opacity') {
                        pageAnnotations[i].opacity = annotationBase.wrapper.children[0].style.opacity;
                        pageAnnotations[i].modifiedDate = date.toLocaleString();
                    } else if (property === 'thickness') {
                        pageAnnotations[i].thickness = annotationBase.wrapper.children[0].style.strokeWidth;
                        pageAnnotations[i].modifiedDate = date.toLocaleString();
                    } else if (property === 'dashArray') {
                        pageAnnotations[i].borderDashArray = annotationBase.wrapper.children[0].style.strokeDashArray;
                        pageAnnotations[i].borderStyle = annotationBase.borderStyle;
                        pageAnnotations[i].modifiedDate = date.toLocaleString();
                    } else if (property === 'startArrow') {
                        // tslint:disable-next-line:max-line-length
                        pageAnnotations[i].lineHeadStart = this.pdfViewer.annotation.getArrowTypeForCollection(annotationBase.sourceDecoraterShapes);
                        pageAnnotations[i].modifiedDate = date.toLocaleString();
                    } else if (property === 'endArrow') {
                        // tslint:disable-next-line:max-line-length
                        pageAnnotations[i].lineHeadEnd = this.pdfViewer.annotation.getArrowTypeForCollection(annotationBase.taregetDecoraterShapes);
                        pageAnnotations[i].modifiedDate = date.toLocaleString();
                    } else if (property === 'notes') {
                        pageAnnotations[i].note = annotationBase.notes;
                        pageAnnotations[i].modifiedDate = date.toLocaleString();
                    } else if (property === 'delete') {
                        currentAnnotObject = pageAnnotations.splice(i, 1)[0];
                        break;
                    } else if (property === 'labelContent') {
                        pageAnnotations[i].note = annotationBase.labelContent;
                        pageAnnotations[i].labelContent = annotationBase.labelContent;
                        pageAnnotations[i].modifiedDate = date.toLocaleString();
                        break;
                    } else if (property === 'fontColor') {
                        pageAnnotations[i].fontColor = annotationBase.fontColor;
                        pageAnnotations[i].modifiedDate = date.toLocaleString();
                    } else if (property === 'fontSize') {
                        pageAnnotations[i].fontSize = annotationBase.fontSize;
                        pageAnnotations[i].modifiedDate = date.toLocaleString();
                    }
                    this.pdfViewer.annotationModule.storeAnnotationCollections(pageAnnotations[i], pageNumber);
                }
            }
            this.manageAnnotations(pageAnnotations, pageNumber);
        }
        return currentAnnotObject;
    }

    /**
     * @private
     */
    public addInCollection(pageNumber: number, annotationBase: IShapeAnnotation): void {
        let pageAnnotations: IShapeAnnotation[] = this.getAnnotations(pageNumber, null);
        if (pageAnnotations) {
            pageAnnotations.push(annotationBase);
        }
        this.manageAnnotations(pageAnnotations, pageNumber);
    }

    /**
     * @private
     */
    public saveShapeAnnotations(): string {
        // tslint:disable-next-line
        let storeObject: any = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_shape');
        if (this.pdfViewerBase.isStorageExceed) {
            storeObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_shape'];
        }
        // tslint:disable-next-line
        let annotations: Array<any> = new Array();
        let colorpick: ColorPicker = new ColorPicker();
        for (let j: number = 0; j < this.pdfViewerBase.pageCount; j++) {
            annotations[j] = [];
        }
        if (storeObject && this.pdfViewer.annotationSettings.isDownload) {
            let annotationCollection: IPageAnnotations[] = JSON.parse(storeObject);
            for (let i: number = 0; i < annotationCollection.length; i++) {
                let newArray: IShapeAnnotation[] = [];
                let pageAnnotationObject: IPageAnnotations = annotationCollection[i];
                if (pageAnnotationObject) {
                    for (let z: number = 0; pageAnnotationObject.annotations.length > z; z++) {
                        // tslint:disable-next-line:max-line-length
                        pageAnnotationObject.annotations[z].bounds = JSON.stringify(this.pdfViewer.annotation.getBounds(pageAnnotationObject.annotations[z].bounds, pageAnnotationObject.pageIndex));
                        let strokeColorString: string = pageAnnotationObject.annotations[z].strokeColor;
                        pageAnnotationObject.annotations[z].strokeColor = JSON.stringify(this.getRgbCode(strokeColorString));
                        let fillColorString: string = pageAnnotationObject.annotations[z].fillColor;
                        pageAnnotationObject.annotations[z].fillColor = JSON.stringify(this.getRgbCode(fillColorString));
                        // tslint:disable-next-line:max-line-length
                        pageAnnotationObject.annotations[z].vertexPoints = JSON.stringify(this.pdfViewer.annotation.getVertexPoints(pageAnnotationObject.annotations[z].vertexPoints, pageAnnotationObject.pageIndex));
                        if (pageAnnotationObject.annotations[z].rectangleDifference !== null) {
                            // tslint:disable-next-line:max-line-length
                            pageAnnotationObject.annotations[z].rectangleDifference = JSON.stringify(pageAnnotationObject.annotations[z].rectangleDifference);
                        }
                        if (pageAnnotationObject.annotations[z].enableShapeLabel === true) {
                            // tslint:disable-next-line:max-line-length
                            pageAnnotationObject.annotations[z].labelBounds = JSON.stringify(this.pdfViewer.annotationModule.inputElementModule.calculateLabelBounds(JSON.parse(pageAnnotationObject.annotations[z].bounds)));
                            let labelFillColorString: string = pageAnnotationObject.annotations[z].labelFillColor;
                            pageAnnotationObject.annotations[z].labelFillColor = JSON.stringify(this.getRgbCode(labelFillColorString));
                            let labelBorderColorString: string = pageAnnotationObject.annotations[z].labelBorderColor;
                            pageAnnotationObject.annotations[z].labelBorderColor = JSON.stringify(this.getRgbCode(labelBorderColorString));
                            let fontColorString: string = pageAnnotationObject.annotations[z].fontColor;
                            pageAnnotationObject.annotations[z].fontColor = JSON.stringify(this.getRgbCode(fontColorString));
                        }
                    }
                    newArray = pageAnnotationObject.annotations;
                }
                annotations[pageAnnotationObject.pageIndex] = newArray;
            }
        }
        return JSON.stringify(annotations);
    }

    private manageAnnotations(pageAnnotations: IShapeAnnotation[], pageNumber: number): void {
        // tslint:disable-next-line
        let storeObject: any = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_shape');
        if (this.pdfViewerBase.isStorageExceed) {
            storeObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_shape'];
        }
        if (storeObject) {
            let annotObject: IPageAnnotations[] = JSON.parse(storeObject);
            if (!this.pdfViewerBase.isStorageExceed) {
                window.sessionStorage.removeItem(this.pdfViewerBase.documentId + '_annotations_shape');
            }
            let index: number = this.pdfViewer.annotationModule.getPageCollection(annotObject, pageNumber);
            if (annotObject[index]) {
                annotObject[index].annotations = pageAnnotations;
            }
            let annotationStringified: string = JSON.stringify(annotObject);
            if (this.pdfViewerBase.isStorageExceed) {
                this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_shape'] = annotationStringified;
            } else {
                window.sessionStorage.setItem(this.pdfViewerBase.documentId + '_annotations_shape', annotationStringified);
            }
        }
    }

    private createAnnotationObject(annotationModel: PdfAnnotationBaseModel): IShapeAnnotation {
        let bound: IRectangle;
        let labelBound: IRectangle;
        let annotationName: string = this.pdfViewer.annotation.createGUID();
        // tslint:disable-next-line:max-line-length
        let commentsDivid: string = this.pdfViewer.annotation.stickyNotesAnnotationModule.addComments('shape', (annotationModel.pageIndex + 1), annotationModel.shapeAnnotationType);
        if (commentsDivid) {
            document.getElementById(commentsDivid).id = annotationName;
        }
        annotationModel.annotName = annotationName;
        if (annotationModel.wrapper.bounds) {
            bound = {
                // tslint:disable-next-line:max-line-length
                left: annotationModel.wrapper.bounds.x, top: annotationModel.wrapper.bounds.y, height: annotationModel.wrapper.bounds.height, width: annotationModel.wrapper.bounds.width,
                right: annotationModel.wrapper.bounds.right, bottom: annotationModel.wrapper.bounds.bottom
            };
            labelBound = this.pdfViewer.annotationModule.inputElementModule.calculateLabelBounds(annotationModel.wrapper.bounds);
        } else {
            bound = { left: 0, top: 0, height: 0, width: 0, right: 0, bottom: 0 };
            labelBound = { left: 0, top: 0, height: 0, width: 0, right: 0, bottom: 0 };
        }
        if (annotationModel.subject === 'Line' && annotationModel.shapeAnnotationType === 'Polygon') {
            annotationModel.author = this.pdfViewer.annotationModule.updateAnnotationAuthor('shape', 'Polygon');
        } else {
            annotationModel.author = this.pdfViewer.annotationModule.updateAnnotationAuthor('shape', annotationModel.subject);
        }
        this.pdfViewer.annotation.stickyNotesAnnotationModule.addTextToComments(annotationName, annotationModel.notes);
        // tslint:disable-next-line:radix
        let borderDashArray: number = parseInt(annotationModel.borderDashArray);
        borderDashArray = isNaN(borderDashArray) ? 0 : borderDashArray;
        let date: Date = new Date();
        // tslint:disable-next-line
        let annotationSettings: any = this.pdfViewer.annotationModule.findAnnotationSettings(annotationModel, true);
        return {
            // tslint:disable-next-line:max-line-length
            id: annotationModel.id, shapeAnnotationType: this.getShapeAnnotType(annotationModel.shapeAnnotationType), author: annotationModel.author, subject: annotationModel.subject, note: annotationModel.notes,
            strokeColor: annotationModel.strokeColor, annotName: annotationName, comments: [], review: { state: '', stateModel: '', modifiedDate: date.toLocaleString(), author: annotationModel.author},
            fillColor: annotationModel.fillColor, opacity: annotationModel.opacity, thickness: annotationModel.thickness,
            // tslint:disable-next-line:max-line-length
            borderStyle: annotationModel.borderStyle, borderDashArray: borderDashArray, bounds: bound, modifiedDate: date.toLocaleString(),
            rotateAngle: 'RotateAngle' + annotationModel.rotateAngle, isCloudShape: annotationModel.isCloudShape, cloudIntensity: annotationModel.cloudIntensity,
            // tslint:disable-next-line:max-line-length
            vertexPoints: annotationModel.vertexPoints, lineHeadStart: this.pdfViewer.annotation.getArrowTypeForCollection(annotationModel.sourceDecoraterShapes),
            lineHeadEnd: this.pdfViewer.annotation.getArrowTypeForCollection(annotationModel.taregetDecoraterShapes), rectangleDifference: [], isLocked: annotationSettings.isLock,
            // tslint:disable-next-line:max-line-length
            labelContent: annotationModel.labelContent, enableShapeLabel: annotationModel.enableShapeLabel, labelFillColor: annotationModel.labelFillColor,
            fontColor: annotationModel.fontColor, labelBorderColor: annotationModel.labelBorderColor, fontSize: annotationModel.fontSize,
            // tslint:disable-next-line:max-line-length
            labelBounds: labelBound, annotationSelectorSettings: this.getSelector(annotationModel.shapeAnnotationType, annotationModel.subject ), labelSettings: this.pdfViewer.shapeLabelSettings, annotationSettings: annotationSettings,
            customData: this.pdfViewer.annotation.getShapeData(annotationModel.shapeAnnotationType, annotationModel.subject)
        };
    }

    private getSelector(type: string, subject: string): AnnotationSelectorSettingsModel {
        let selector: AnnotationSelectorSettingsModel = this.pdfViewer.annotationSelectorSettings;
        if (type === 'Line' && subject !== 'Arrow' && this.pdfViewer.lineSettings.annotationSelectorSettings) {
                selector = this.pdfViewer.lineSettings.annotationSelectorSettings;
         } else if ((type === 'LineWidthArrowHead' || subject === 'Arrow') && this.pdfViewer.lineSettings.annotationSelectorSettings) {
                selector = this.pdfViewer.arrowSettings.annotationSelectorSettings;
         } else if ((type === 'Rectangle' || type === 'Square') && this.pdfViewer.rectangleSettings.annotationSelectorSettings) {
               selector = this.pdfViewer.rectangleSettings.annotationSelectorSettings;
        } else if ((type === 'Ellipse' || type === 'Circle') && this.pdfViewer.circleSettings.annotationSelectorSettings) {
               selector = this.pdfViewer.circleSettings.annotationSelectorSettings;
        } else if (type === 'Polygon' && this.pdfViewer.polygonSettings.annotationSelectorSettings) {
               selector = this.pdfViewer.polygonSettings.annotationSelectorSettings;
        }
        return selector;
    }

    // tslint:disable-next-line
    private getAnnotations(pageIndex: number, shapeAnnotations: any[]): any[] {
        // tslint:disable-next-line
        let annotationCollection: any[];
        // tslint:disable-next-line
        let storeObject: any = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_shape');
        if (this.pdfViewerBase.isStorageExceed) {
            storeObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_shape'];
        }
        if (storeObject) {
            let annotObject: IPageAnnotations[] = JSON.parse(storeObject);
            let index: number = this.pdfViewer.annotationModule.getPageCollection(annotObject, pageIndex);
            if (annotObject[index]) {
                annotationCollection = annotObject[index].annotations;
            } else {
                annotationCollection = shapeAnnotations;
            }
        } else {
            annotationCollection = shapeAnnotations;
        }
        return annotationCollection;
    }

    // tslint:disable-next-line
    private getRgbCode(colorString: string): any {
        if (!colorString.match(/#([a-z0-9]+)/gi) && !colorString.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/)) {
            colorString = this.pdfViewer.annotationModule.nameToHash(colorString);
         }
        let stringArray: string[] = colorString.split(',');
        if (isNullOrUndefined(stringArray[1])) {
            let colorpick: ColorPicker = new ColorPicker();
            colorString = colorpick.getValue(colorString, 'rgba');
            stringArray = colorString.split(',');
        }
        // tslint:disable-next-line:radix
        let r: number = parseInt(stringArray[0].split('(')[1]);
        // tslint:disable-next-line:radix
        let g: number = parseInt(stringArray[1]);
        // tslint:disable-next-line:radix
        let b: number = parseInt(stringArray[2]);
        // tslint:disable-next-line:radix
        let a: number = parseInt(stringArray[3]);
        return { r: r, g: g, b: b, a: a };
    }

    /**
     * @private
     */
    // tslint:disable-next-line
    public saveImportedShapeAnnotations(annotation: any, pageNumber: number): any {
        let annotationObject: IShapeAnnotation = null;
        let vertexPoints: IPoint[] = null;
        annotation.Author = this.pdfViewer.annotationModule.updateAnnotationAuthor('shape', annotation.Subject);
        if (annotation.VertexPoints) {
            vertexPoints = [];
            for (let j: number = 0; j < annotation.VertexPoints.length; j++) {
                let point: IPoint = { x: annotation.VertexPoints[j].X, y: annotation.VertexPoints[j].Y };
                vertexPoints.push(point);
            }
        }
        if (annotation.Bounds && annotation.EnableShapeLabel === true) {
            // tslint:disable-next-line:max-line-length
            annotation.LabelBounds = this.pdfViewer.annotationModule.inputElementModule.calculateLabelBoundsFromLoadedDocument(annotation.Bounds);
            // tslint:disable-next-line:max-line-length
            annotation.LabelBorderColor = annotation.LabelBorderColor ? annotation.LabelBorderColor : annotation.StrokeColor;
            annotation.FontColor = annotation.FontColor ? annotation.FontColor : annotation.StrokeColor;
            annotation.LabelFillColor = annotation.LabelFillColor ? annotation.LabelFillColor : annotation.FillColor;
            annotation.FontSize = annotation.FontSize ? annotation.FontSize : 16;
            annotation.LabelSettings = annotation.LabelSettings ? annotation.LabelSettings : this.pdfViewer.shapeLabelSettings;
        }
        // tslint:disable-next-line:max-line-length
        annotation.AnnotationSettings = annotation.AnnotationSettings ? annotation.AnnotationSettings : this.pdfViewer.annotationModule.updateAnnotationSettings(annotation);
        // tslint:disable-next-line:max-line-length
        annotationObject = {
            id: 'shape', shapeAnnotationType: annotation.ShapeAnnotationType, author: annotation.Author, modifiedDate: annotation.ModifiedDate, subject: annotation.Subject,
            // tslint:disable-next-line:max-line-length
            note: annotation.Note, strokeColor: annotation.StrokeColor, fillColor: annotation.FillColor, opacity: annotation.Opacity, thickness: annotation.Thickness, rectangleDifference: annotation.RectangleDifference,
            borderStyle: annotation.BorderStyle, borderDashArray: annotation.BorderDashArray, rotateAngle: annotation.RotateAngle, isCloudShape: annotation.IsCloudShape,
            // tslint:disable-next-line:max-line-length
            cloudIntensity: annotation.CloudIntensity, vertexPoints: vertexPoints, lineHeadStart: annotation.LineHeadStart, lineHeadEnd: annotation.LineHeadEnd, isLocked: annotation.IsLocked, comments: this.pdfViewer.annotationModule.getAnnotationComments(annotation.Comments, annotation, annotation.Author), review: { state: annotation.State, stateModel: annotation.StateModel, modifiedDate: annotation.ModifiedDate, author: annotation.Author }, annotName: annotation.AnnotName,
            bounds: { left: annotation.Bounds.X, top: annotation.Bounds.Y, width: annotation.Bounds.Width, height: annotation.Bounds.Height, right: annotation.Bounds.Right, bottom: annotation.Bounds.Bottom },
            labelContent: annotation.LabelContent, enableShapeLabel: annotation.EnableShapeLabel, labelFillColor: annotation.LabelFillColor,
            labelBorderColor: annotation.LabelBorderColor, fontColor: annotation.FontColor, fontSize: annotation.FontSize,
            // tslint:disable-next-line:max-line-length
            labelBounds: annotation.LabelBounds, annotationSelectorSettings: this.getSettings(annotation), labelSettings: annotation.LabelSettings, annotationSettings: annotation.AnnotationSettings,
            customData: this.pdfViewer.annotation.getCustomData(annotation)
        };
        this.pdfViewer.annotationModule.storeAnnotations(pageNumber, annotationObject, '_annotations_shape');
    }

    /**
     * @private
     */
    // tslint:disable-next-line
    public updateShapeAnnotationCollections(annotation: any, pageNumber: number): any {
        // tslint:disable-next-line
        let annotationObject: any = null;
        let vertexPoints: IPoint[] = null;
        if (annotation.VertexPoints) {
            vertexPoints = [];
            for (let j: number = 0; j < annotation.VertexPoints.length; j++) {
                let point: IPoint = { x: annotation.VertexPoints[j].X, y: annotation.VertexPoints[j].Y };
                vertexPoints.push(point);
            }
        }
        if (annotation.Bounds && annotation.EnableShapeLabel === true) {
            // tslint:disable-next-line:max-line-length
            annotation.LabelBounds = this.pdfViewer.annotationModule.inputElementModule.calculateLabelBoundsFromLoadedDocument(annotation.Bounds);
            // tslint:disable-next-line:max-line-length
            annotation.LabelBorderColor = annotation.LabelBorderColor ? annotation.LabelBorderColor : annotation.StrokeColor;
            annotation.FontColor = annotation.FontColor ? annotation.FontColor : annotation.StrokeColor;
            annotation.LabelFillColor = annotation.LabelFillColor ? annotation.LabelFillColor : annotation.FillColor;
            annotation.FontSize = annotation.FontSize ? annotation.FontSize : 16;
            annotation.LabelSettings = annotation.LabelSettings ? annotation.LabelSettings : this.pdfViewer.shapeLabelSettings;
        }
        // tslint:disable-next-line:max-line-length
        annotation.AnnotationSettings = annotation.AnnotationSettings ? annotation.AnnotationSettings : this.pdfViewer.annotationModule.updateAnnotationSettings(annotation);
        // tslint:disable-next-line:max-line-length
        annotationObject = {
            id: 'shape', shapeAnnotationType: annotation.ShapeAnnotationType, author: annotation.Author, modifiedDate: annotation.ModifiedDate, subject: annotation.Subject,
            // tslint:disable-next-line:max-line-length
            note: annotation.Note, strokeColor: annotation.StrokeColor, fillColor: annotation.FillColor, opacity: annotation.Opacity, thickness: annotation.Thickness, rectangleDifference: annotation.RectangleDifference,
            borderStyle: annotation.BorderStyle, borderDashArray: annotation.BorderDashArray, rotateAngle: annotation.RotateAngle, isCloudShape: annotation.IsCloudShape,
            // tslint:disable-next-line:max-line-length
            cloudIntensity: annotation.CloudIntensity, vertexPoints: vertexPoints, lineHeadStart: annotation.LineHeadStart, lineHeadEnd: annotation.LineHeadEnd, isLocked: annotation.IsLocked, comments: this.pdfViewer.annotationModule.getAnnotationComments(annotation.Comments, annotation, annotation.Author), review: { state: annotation.State, stateModel: annotation.StateModel, modifiedDate: annotation.ModifiedDate, author: annotation.Author }, annotationId: annotation.AnnotName,
            bounds: { left: annotation.Bounds.X, top: annotation.Bounds.Y, width: annotation.Bounds.Width, height: annotation.Bounds.Height, right: annotation.Bounds.Right, bottom: annotation.Bounds.Bottom },
            labelContent: annotation.LabelContent, enableShapeLabel: annotation.EnableShapeLabel, labelFillColor: annotation.LabelFillColor,
            labelBorderColor: annotation.LabelBorderColor, fontColor: annotation.FontColor, fontSize: annotation.FontSize,
            // tslint:disable-next-line:max-line-length
            labelBounds: annotation.LabelBounds, pageNumber: pageNumber, labelSettings: annotation.LabelSettings, annotationSettings: annotation.AnnotationSettings,
            customData: this.pdfViewer.annotation.getCustomData(annotation)
        };
        return annotationObject;
    }
}