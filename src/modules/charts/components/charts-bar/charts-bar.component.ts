import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { Chart } from 'chart.js';

@Component({
    selector: 'sb-charts-bar',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './charts-bar.component.html',
    styleUrls: ['charts-bar.component.scss'],
})
export class ChartsBarComponent implements OnInit, AfterViewInit, OnChanges, AfterContentInit {
    @ViewChild('myBarChart') myBarChart!: ElementRef<HTMLCanvasElement>;
    @Input() labels : string[] = [];
    @Input() datas : number[] = [];
    @Input() max : number = 0;
    @Input() nbr : number = 0;
    chart!: Chart;

    constructor() {}
    ngOnInit() {
        console.log(this.labels);
        console.log(this.datas);
    }

    ngAfterViewInit() {
        this.chart = new Chart(this.myBarChart.nativeElement, {
            type: 'bar',
            data: {
                labels: this.labels,
                datasets: [
                    {
                        label: 'Revenue',
                        backgroundColor: 'rgba(2,117,216,1)',
                        borderColor: 'rgba(2,117,216,1)',
                        data:this.datas,
                    },
                ],
            },
            options: {
                scales: {
                    xAxes: [
                        {
                            time: {
                                unit: 'month',
                            },
                            gridLines: {
                                display: false,
                            },
                            ticks: {
                                maxTicksLimit: this.nbr,
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                min: 0,
                                max: this.max,
                                maxTicksLimit: 5,
                            },
                            gridLines: {
                                display: true,
                            },
                        },
                    ],
                },
                legend: {
                    display: false,
                },
            },
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
      this.ngOnInit();
    }

    ngAfterContentInit(): void {
        // this.chart = new Chart(this.myBarChart.nativeElement, {
        //     type: 'bar',
        //     data: {
        //         labels: this.labels,
        //         datasets: [
        //             {
        //                 label: 'Revenue',
        //                 backgroundColor: 'rgba(2,117,216,1)',
        //                 borderColor: 'rgba(2,117,216,1)',
        //                 data:this.datas,
        //             },
        //         ],
        //     },
        //     options: {
        //         scales: {
        //             xAxes: [
        //                 {
        //                     time: {
        //                         unit: 'month',
        //                     },
        //                     gridLines: {
        //                         display: false,
        //                     },
        //                     ticks: {
        //                         maxTicksLimit: this.nbr,
        //                     },
        //                 },
        //             ],
        //             yAxes: [
        //                 {
        //                     ticks: {
        //                         min: 0,
        //                         max: this.max,
        //                         maxTicksLimit: 5,
        //                     },
        //                     gridLines: {
        //                         display: true,
        //                     },
        //                 },
        //             ],
        //         },
        //         legend: {
        //             display: false,
        //         },
        //     },
        // });
    }
}
