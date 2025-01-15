import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GrammarTopicComponent} from './grammar-topic.component';

describe('TopicTaskComponent', () => {
    let component: GrammarTopicComponent;
    let fixture: ComponentFixture<GrammarTopicComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [GrammarTopicComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(GrammarTopicComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
