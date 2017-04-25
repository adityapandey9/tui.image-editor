/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Test cases of "src/js/component/filter.js"
 */
import ImageEditor from '../src/js/imageEditor';

describe('Filter', () => {
    let imageEditor;
    const imageURL = 'base/test/fixtures/sampleImage.jpg';

    beforeEach(done => {
        imageEditor = new ImageEditor($('<div></div>'), {
            cssMaxWidth: 700,
            cssMaxHeight: 500
        });
        imageEditor.loadImageFromURL(imageURL, 'sampleImage');
        imageEditor.once('loadImage', () => {
            // can't call editor function until this callback is end.
            setTimeout(() => {
                imageEditor.applyFilter('colorFilter');
                imageEditor.once('applyFilter', () => {
                    // can't call editor function until this callback is end.
                    setTimeout(() => {
                        done();
                    }, 0);
                });
            }, 0);
        });
    });

    afterEach(() => {
        imageEditor.destroy();
    });

    it('applyFilter can add undo stack', () => {
        expect(imageEditor.isEmptyUndoStack()).toBe(false);
    });

    it('hasFilter', () => {
        expect(imageEditor.hasFilter('invert')).toBe(false);
        expect(imageEditor.hasFilter('colorFilter')).toBe(true);
    });

    describe('removeFilter', () => {
        beforeEach(done => {
            imageEditor.removeFilter('colorFilter');
            imageEditor.once('applyFilter', () => {
                // can't call editor function until this callback is end.
                setTimeout(() => {
                    done();
                }, 0);
            });
        });

        it('has no "colorFilter" filter', () => {
            expect(imageEditor.hasFilter('colorFilter')).toBe(false);
            expect(imageEditor.isEmptyUndoStack()).toBe(false);
        });
    });
});
