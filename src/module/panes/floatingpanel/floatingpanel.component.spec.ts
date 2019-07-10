import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { AmexioFloatingPanelComponent } from './floatingpanel.component';
import { AmexioFormsModule } from '../../forms/amexio.forms.module';
import { SimpleChange } from '@angular/core';

describe('amexio-floating-panel', () => {
    let comp: AmexioFloatingPanelComponent;
    let fixture: ComponentFixture<AmexioFloatingPanelComponent>;
    let event1:any;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, AmexioFormsModule],
            declarations: [AmexioFloatingPanelComponent],
            providers: [IconLoaderService],
        }).compileComponents();
        fixture = TestBed.createComponent(AmexioFloatingPanelComponent);
        comp = fixture.componentInstance;
        event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
        it('true is true', () => expect(true).toBe(true));
        

    });
    // it('should create the app', async(() => {
    //     const fixture = TestBed.createComponent(AmexioFloatingPanelComponent);
    //     const comp = fixture.debugElement.componentInstance;
    //     fixture.detectChanges();
    //     expect(comp).toBeTruthy();
    // }));

 it('ngOnchanges method call if condition',() => {
    let element = fixture.nativeElement;
     let showPanel = true;
     comp.absolute = true;
       comp.showPanel = showPanel;
       let currentshowpanel:boolean;
       comp.ngOnChanges({
        changes: new SimpleChange(null, showPanel,false)
       }
    );
       fixture.detectChanges();
       expect(comp.showPanel).toBe(showPanel);
       expect(comp.absolute).toBe(true);
       comp.setPanelAbsolutePostion();
    });

 it('ngOnchanges method call else condition',() => {
      let element = fixture.nativeElement;
      let showPanel = true;
       comp.absolute = false;
       comp.showPanel = showPanel;
       let currentshowpanel:boolean;
       comp.ngOnChanges({
        changes: new SimpleChange(null, showPanel,false)
       }
    );
       fixture.detectChanges();
       expect(comp.showPanel).toBe(showPanel);
       expect(comp.absolute).toBe(false);
       comp.panelStyle();
    });
    // it('ngOnInit method', () => {
    //     comp.absolute = true;
    //     comp.width = '';
    //     comp.showPanel = false;
    //     comp.arrow = true;
    //     comp.relative = true;
    //     comp.ngOnInit();
    //     expect(comp.absolute).toEqual(true);
    //     comp.relative = false;  
    //     comp.height = '';             
    //     expect(comp.height).toEqual('');
    //     comp.height = 200;
    //     comp.width = '';
    //     expect(comp.width).toEqual('');    
    //     comp.width = 400;  
    //     expect(comp.showPanel).toEqual(true);        
    //     comp.panelStyle();    
    //     comp.draggable = true;        
    //     expect(comp.draggable).toEqual(true);
    //     expect(comp.arrow).toEqual(true);
    //      comp.draggable  = false;  
    // });

    it('panel style method if condition ', () => {
        comp.relative = true;
        comp.width = '200';
        comp.panelStyle();
        comp.style = {};
        expect(comp.relative).toEqual(true);
        comp.style['position'] = 'absolute';
        comp.style['display'] = 'block';
        comp.style['z-index'] = '600';
        comp.style['opacity'] = '1';
        comp.style['box-shadow'] = '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)';
        expect(comp.width).not.toEqual('');
        comp.style['width'] = comp.width + 'px';
        comp.arrowPadding();
    })

    it('panel style method else condition ', () => {
        comp.relative = false;
        comp.width = '';
        comp.panelStyle();
        comp.style = {};
        expect(comp.relative).toEqual(false);
        comp.style['position'] = 'fixed';
        comp.style['display'] = 'block';
        comp.style['z-index'] = '600';
        comp.style['opacity'] = '1';
        comp.style['box-shadow'] = '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)';
        expect(comp.width).toEqual('');
        comp.style['width'] = '400px';
        expect(comp.relative).toEqual(false);
        comp.setPanelStylePostion();
        comp.arrowPadding();
    })
    it('arrowPadding method', () => {
        comp.arrow = true;
        comp.arrowPadding();
        expect(comp.arrow).toEqual(true);
        expect(comp.style['margin-top']).toBe('16px');
    });
    it('setpanelStyleposition', () => {
        comp.topPosition = '20px';
        comp.bottomPosition = '20px';
        comp.rightPosition = '20px';
        comp.leftPosition = '20px';
        comp.setPanelStylePostion();

        expect(comp.style['top']).toEqual('20px');
        expect(comp.style['left']).toEqual('20px');
        expect(comp.style['bottom']).toEqual('20px');
        expect(comp.style['right']).toEqual('20px');

    });
    it('changeHeaderColor method', () => {
        comp.gradientFlag = true;
        comp.changeHeaderColor();
    });
    it('setcolorpallete method', () => {
        let themeClass: any;
        comp.setColorPalette(themeClass);
        comp.themeCss = themeClass;
    });
    it('setpanelAbsolutePosition if  method', () => {
        comp.width = '200';
        comp.setPanelAbsolutePostion();
        comp.style = {};
        comp.style['position'] = 'absolute';
        comp.style['display'] = 'block';
        comp.style['z-index'] = '400';
        comp.style['opacity'] = '1';
        comp.style['box-shadow'] = '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)';
        expect(comp.width).not.toEqual('')
        comp.style['width'] = comp.width + 'px';
        comp.setPanelStylePostion();
        comp.arrowPadding();
    })
    it('setpanelAbsolutePosition else  method', () => {
        comp.width = '';
        comp.setPanelAbsolutePostion();
        comp.style = {};
        comp.style['position'] = 'absolute';
        comp.style['display'] = 'block';
        comp.style['z-index'] = '400';
        comp.style['opacity'] = '1';
        comp.style['box-shadow'] = '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)';
        expect(comp.width).toEqual('');
        comp.width = '400px';
        comp.setPanelStylePostion();
        comp.arrowPadding();      
    })
    it('checking togglePanel method', () => {
        comp.showPanel = false;
        comp.togglePanel();
        comp.showPanel = false;
        expect(comp.showPanel).toEqual(false);
        comp.onclose.subscribe((g: any) => {
            expect(comp.onclose).toEqual(g);
        });
        comp.showPanelChange.subscribe((g: any) => {
            expect(comp.showPanelChange).toEqual(g);
        });
    });
    it('elementDrag method  if call', () => {
        comp.pos1 = 0;
        comp.pos2 = 0;
        comp.pos3 = 0;
        comp.pos4 = 0;
        comp.bottomPosition = '20px';
        comp.style =  {'bottom':'10px'};
        let floatingPanel = {
            'offsetTop':1200,
            'offsetLeft':145,
            'style': {
                'top':'20px',
                'left':'10px',
                'opacity':'1'
            }
        }
    let  e = jasmine.createSpyObj('e', [ 'preventDefault' ]); 
    e['clientX'] = 1200;
    e['clientY'] = 1400;         
    comp.elementDrag(e,floatingPanel);
    expect(e.preventDefault).toHaveBeenCalled(); 
    comp.pos1 = comp.pos3 - e.clientX;
    comp.pos2 = comp.pos4 - e.clientY;
    comp.pos3 = e.clientX;
    comp.pos4 = e.clientY;
    expect(comp.bottomPosition).toBeDefined();
    delete comp.style['bottom'];
        floatingPanel.style.top = (floatingPanel.offsetTop - comp.pos2) + 'px';
        floatingPanel.style.left = (floatingPanel.offsetLeft - comp.pos1) + 'px';
        floatingPanel.style.opacity = '0.7';
        comp.opacitiy = true;
    });
    it('elementDrag method else call', () => {
        comp.pos1 = 0;
        comp.pos2 = 0;
        comp.pos3 = 0;
        comp.pos4 = 0;
        comp.style =  {'bottom':'10px'};
        let floatingPanel = {
            'offsetTop':1200,
            'offsetLeft':145,
            'style': {
                'top':'20px',
                'left':'10px',
                'opacity':'1'
            }
        }
    let  e = jasmine.createSpyObj('e', [ 'preventDefault' ]); 
    e['clientX'] = 1200;
    e['clientY'] = 1400;         
    comp.elementDrag(e,floatingPanel);
    expect(e.preventDefault).toHaveBeenCalled(); 
    comp.pos1 = comp.pos3 - e.clientX;
    comp.pos2 = comp.pos4 - e.clientY;
    comp.pos3 = e.clientX;
    comp.pos4 = e.clientY;
    expect(comp.bottomPosition).toBeUndefined();
    });
});

