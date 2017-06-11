
require('chai').should();

import { UrlService } from '../../../src/services/url-service';

describe('UrlService', () => {
  var urlService = new UrlService();

  it('should get link projectByProjectId', () => {
    const link = urlService.getLink('projectByProjectId', '123');
    link.should.be.equal("/project/123");
  })

  it('should get link pageByProjectIdAndPageId', () => {
    const link = urlService.getLink('pageByProjectIdAndPageId', '123', 'xyz');
    link.should.be.equal("/project/123/page/xyz");
  })

  it('should get url projects', () => {
    const link = urlService.getUrl('projects');
    link.should.be.equal("http://localhost:3000/api/v1/projects");
  })

  it('should get url pageByProjectIdAndPageId', () => {
    const link = urlService.getUrl('pageByProjectIdAndPageId', 'abc', 'xyz');
    link.should.be.equal("http://localhost:3000/api/v1/projects/abc/pages/xyz");
  })
})
