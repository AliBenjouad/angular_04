import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommentService } from './comment.service';

describe('CommentService', () => {
  let service: CommentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommentService]
    });
    service = TestBed.inject(CommentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a comment', () => {
    const dummyComment = { answerId: '1', text: 'Great answer!' };
    service.addComment(dummyComment).subscribe(comment => {
      expect(comment).toEqual(dummyComment);
    });

    const req = httpMock.expectOne('http://localhost:5001/api/comments/1');
    expect(req.request.method).toBe('POST');
    req.flush(dummyComment);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
