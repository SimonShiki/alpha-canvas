const { Extension, type, api } = require('clipcc-extension');
const CanvasEngine = require('./canvas-engine.js');
const Cast = require('./cast.js');
class Canvas extends Extension {
    onInit() {
        const { runtime } = api.getVmInstance();
        this.canvasEngine = new CanvasEngine(runtime);
        this._bufferedImages = [];

        api.addCategory({
            categoryId: 'alpha.canvas.category',
            messageId: 'alpha.canvas.category',
            color: '#0fbd8c'
        });
        api.addBlock({
            opcode: 'alpha.canvas.beginPath',
            type: type.BlockType.COMMAND,
            messageId: 'alpha.canvas.beginPath',
            categoryId: 'alpha.canvas.category',
            function: () => {
                try {
                    const canvas = this.canvasEngine.getDrawable();
                    const ctx = canvas.getContext('2d');
                    ctx.beginPath();
                } catch (e) {
                    console.error(e);
                }
            }
        });
        api.addBlock({
            opcode: 'alpha.canvas.closePath',
            type: type.BlockType.COMMAND,
            messageId: 'alpha.canvas.closePath',
            categoryId: 'alpha.canvas.category',
            function: () => {
                try {
                    const canvas = this.canvasEngine.getDrawable();
                    const ctx = canvas.getContext('2d');
                    ctx.closePath();
                } catch (e) {
                    console.error(e);
                }
            }
        });
        api.addBlock({
            opcode: 'alpha.canvas.setFillStyle',
            type: type.BlockType.COMMAND,
            messageId: 'alpha.canvas.setFillStyle',
            categoryId: 'alpha.canvas.category',
            param: {
                FILL_STYLE: {
                    type: type.ParameterType.STRING,
                    default: '#000000'
                }
            },
            function: (args, util) => {
                try {
                    const canvas = this.canvasEngine.getDrawable();
                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = args.FILL_STYLE;
                } catch (e) {
                    console.error(e);
                }
            }
        });
        api.addBlock({
            opcode: 'alpha.canvas.setStrokeStyle',
            type: type.BlockType.COMMAND,
            messageId: 'alpha.canvas.setStrokeStyle',
            categoryId: 'alpha.canvas.category',
            param: {
                STROKE_STYLE: {
                    type: type.ParameterType.STRING,
                    default: '#000000'
                }
            },
            function: (args, util) => {
                try {
                    const canvas = this.canvasEngine.getDrawable();
                    const ctx = canvas.getContext('2d');
                    ctx.strokeStyle = args.STROKE_STYLE;
                } catch (e) {
                    console.error(e);
                }
            }
        });
        api.addBlock({
            opcode: 'alpha.canvas.setLineWidth',
            type: type.BlockType.COMMAND,
            messageId: 'alpha.canvas.setLineWidth',
            categoryId: 'alpha.canvas.category',
            param: {
                LINE_WIDTH: {
                    type: type.ParameterType.NUMBER,
                    default: '1'
                }
            },
            function: (args, util) => {
                try {
                    const canvas = this.canvasEngine.getDrawable();
                    const ctx = canvas.getContext('2d');
                    ctx.lineWidth = args.LINE_WIDTH;
                } catch (e) {
                    console.error(e);
                }
            }
        });
        api.addBlock({
            opcode: 'alpha.canvas.setLineCap',
            type: type.BlockType.COMMAND,
            messageId: 'alpha.canvas.setLineCap',
            categoryId: 'alpha.canvas.category',
            param: {
                LINE_CAP: {
                    type: type.ParameterType.STRING,
                    default: 'round'
                }
            },
            function: (args, util) => {
                try {
                    const canvas = this.canvasEngine.getDrawable();
                    const ctx = canvas.getContext('2d');
                    ctx.lineCap = args.LINE_CAP;
                } catch (e) {
                    console.error(e);
                }
            }
        });
        api.addBlock({
            opcode: 'alpha.canvas.setFont',
            type: type.BlockType.COMMAND,
            messageId: 'alpha.canvas.setFont',
            categoryId: 'alpha.canvas.category',
            param: {
                FONT: {
                    type: type.ParameterType.STRING,
                    default: '30px Arial'
                }
            },
            function: (args, util) => {
                try {
                    const canvas = this.canvasEngine.getDrawable();
                    const ctx = canvas.getContext('2d');
                    ctx.font = args.FONT;
                } catch (e) {
                    console.error(e);
                }
            }
        });
        api.addBlock({
            opcode: 'alpha.canvas.strokeText',
            type: type.BlockType.COMMAND,
            messageId: 'alpha.canvas.strokeText',
            categoryId: 'alpha.canvas.category',
            param: {
                TEXT: {
                    type: type.ParameterType.STRING,
                    default: 'ClipCC yyds!'
                },
                X: {
                    type: type.ParameterType.NUMBER,
                    default: '0'
                },
                Y: {
                    type: type.ParameterType.NUMBER,
                    default: '0'
                }
            },
            function: (args, util) => {
                try {
                    const canvas = this.canvasEngine.getDrawable();
                    const ctx = canvas.getContext('2d');
                    const x = Cast.toNumber(args.X);
                    const y = Cast.toNumber(args.Y);
                    ctx.strokeText(args.TEXT, x, y);
                } catch (e) {
                    console.error(e);
                }
            }
        });
        api.addBlock({
            opcode: 'alpha.canvas.fillText',
            type: type.BlockType.COMMAND,
            messageId: 'alpha.canvas.fillText',
            categoryId: 'alpha.canvas.category',
            param: {
                TEXT: {
                    type: type.ParameterType.STRING,
                    default: 'ClipCC yyds!'
                },
                X: {
                    type: type.ParameterType.NUMBER,
                    default: '0'
                },
                Y: {
                    type: type.ParameterType.NUMBER,
                    default: '0'
                }
            },
            function: (args, util) => {
                try {
                    const canvas = this.canvasEngine.getDrawable();
                    const ctx = canvas.getContext('2d');
                    const x = Cast.toNumber(args.X);
                    const y = Cast.toNumber(args.Y);
                    ctx.fillText(args.TEXT, x, y);
                } catch (e) {
                    console.error(e);
                }
            }
        });
        api.addBlock({
            opcode: 'alpha.canvas.measureText',
            type: type.BlockType.REPORTER,
            messageId: 'alpha.canvas.measureText',
            categoryId: 'alpha.canvas.category',
            param: {
                TEXT: {
                    type: type.ParameterType.STRING,
                    default: 'ClipCC yyds!'
                }
            },
            function: (args, util) => {
                try {
                    const canvas = this.canvasEngine.getDrawable();
                    const ctx = canvas.getContext('2d');
                    return ctx.measureText(args.TEXT).width;
                } catch (e) {
                    console.error(e);
                }
            }
        });
        api.addBlock({
            opcode: 'alpha.canvas.loadImage',
            type: type.BlockType.COMMAND,
            messageId: 'alpha.canvas.loadImage',
            categoryId: 'alpha.canvas.category',
            param: {
                IMAGE_ID: {
                    type: type.ParameterType.STRING,
                    default: 'c6b1479621329fac5f2f8321678cc8d9'
                }
            },
            function: (args, util) => {
                return new Promise(resolve => {
                    // 设置回调后从资源服务器加载图片
                    const img = new Image();
                    img.crossOrigin = "anonymous";
                    img.onload = () => {
                        this._bufferedImages[args.IMAGE_ID] = img;
                        resolve();
                    }
                    img.onerror = (e) => {
                        console.error('error occurred while loading image', e);
                        resolve();
                    }
                    img.src = `https://api.codingclip.com/v1/project/asset/${args.IMAGE_ID}`;
                });
            }
        });
        api.addBlock({
            opcode: 'alpha.canvas.drawImage',
            type: type.BlockType.COMMAND,
            messageId: 'alpha.canvas.drawImage',
            categoryId: 'alpha.canvas.category',
            param: {
                IMAGE_ID: {
                    type: type.ParameterType.STRING,
                    default: 'c6b1479621329fac5f2f8321678cc8d9'
                },
                X: {
                    type: type.ParameterType.NUMBER,
                    default: '0'
                },
                Y: {
                    type: type.ParameterType.NUMBER,
                    default: '0'
                }
            },
            function: (args, util) => {
                try {
                    const canvas = this.canvasEngine.getDrawable();
                    const ctx = canvas.getContext('2d');
                    const x = Cast.toNumber(args.X);
                    const y = Cast.toNumber(args.Y);
                
                    const img = this._bufferedImages[args.IMAGE_ID];
                    if (!img) return;
                    ctx.drawImage(img, x, y);
                } catch (e) {
                    console.error(e);
                }
            }
        });
        api.addBlock({
            opcode: 'alpha.canvas.clearRect',
            type: type.BlockType.COMMAND,
            messageId: 'alpha.canvas.clearRect',
            categoryId: 'alpha.canvas.category',
            param: {
                X: {
                    type: type.ParameterType.NUMBER,
                    default: '0'
                },
                Y: {
                    type: type.ParameterType.NUMBER,
                    default: '0'
                },
                W: {
                    type: type.ParameterType.NUMBER,
                    default: '480'
                },
                H: {
                    type: type.ParameterType.NUMBER,
                    default: '360'
                }
            },
            function: (args, util) => {
                try {
                    const canvas = this.canvasEngine.getDrawable();
                    const ctx = canvas.getContext('2d');
                    const x = Cast.toNumber(args.X);
                    const y = Cast.toNumber(args.Y);
                    const width = Cast.toNumber(args.W);
                    const height = Cast.toNumber(args.H);
                    ctx.clearRect(x, y, width, height);
                } catch (e) {
                    console.error(e);
                }
            }
        });
        api.addBlock({
            opcode: 'alpha.canvas.moveTo',
            type: type.BlockType.COMMAND,
            messageId: 'alpha.canvas.moveTo',
            categoryId: 'alpha.canvas.category',
            param: {
                X: {
                    type: type.ParameterType.NUMBER,
                    default: '0'
                },
                Y: {
                    type: type.ParameterType.NUMBER,
                    default: '0'
                }
            },
            function: (args, util) => {
                try {
                    const canvas = this.canvasEngine.getDrawable();
                    const ctx = canvas.getContext('2d');
                    const x = Cast.toNumber(args.X);
                    const y = Cast.toNumber(args.Y);
                    ctx.moveTo(x, y);
                } catch (e) {
                    console.error(e);
                }
            }
        });
        api.addBlock({
            opcode: 'alpha.canvas.scale',
            type: type.BlockType.COMMAND,
            messageId: 'alpha.canvas.scale',
            categoryId: 'alpha.canvas.category',
            param: {
                SCALE_W: {
                    type: type.ParameterType.NUMBER,
                    default: '1.0'
                },
                SCALE_H: {
                    type: type.ParameterType.NUMBER,
                    default: '1.0'
                }
            },
            function: (args, util) => {
                try {
                    const canvas = this.canvasEngine.getDrawable();
                    const ctx = canvas.getContext('2d');
                    const width = Cast.toNumber(args.SCALE_W);
                    const height = Cast.toNumber(args.SCALE_H);
                    ctx.scale(width, height);
                } catch (e) {
                    console.error(e);
                }
            }
        });
        api.addBlock({
            opcode: 'alpha.canvas.rotate',
            type: type.BlockType.COMMAND,
            messageId: 'alpha.canvas.rotate',
            categoryId: 'alpha.canvas.category',
            param: {
                ANGLE: {
                    type: type.ParameterType.NUMBER,
                    default: '0'
                }
            },
            function: (args, util) => {
                try {
                    const canvas = this.canvasEngine.getDrawable();
                    const ctx = canvas.getContext('2d');
                    const angle = Cast.toNumber(args.ANGLE);
                    ctx.rotate(angle);
                } catch (e) {
                    console.error(e);
                }
            }
        });
        api.addBlock({
            opcode: 'alpha.canvas.translate',
            type: type.BlockType.COMMAND,
            messageId: 'alpha.canvas.translate',
            categoryId: 'alpha.canvas.category',
            param: {
                X: {
                    type: type.ParameterType.NUMBER,
                    default: '0'
                },
                Y: {
                    type: type.ParameterType.NUMBER,
                    default: '0'
                }
            },
            function: (args, util) => {
                try {
                    const canvas = this.canvasEngine.getDrawable();
                    const ctx = canvas.getContext('2d');
                    const x = Cast.toNumber(args.X);
                    const y = Cast.toNumber(args.Y);
                    ctx.translate(x, y);
                } catch (e) {
                    console.error(e);
                }
            }
        });
        api.addBlock({
            opcode: 'alpha.canvas.transform',
            type: type.BlockType.COMMAND,
            messageId: 'alpha.canvas.transform',
            categoryId: 'alpha.canvas.category',
            param: {
                A: {
                    type: type.ParameterType.NUMBER,
                    default: '0'
                },
                B: {
                    type: type.ParameterType.NUMBER,
                    default: '0'
                },
                C: {
                    type: type.ParameterType.NUMBER,
                    default: '0'
                },
                D: {
                    type: type.ParameterType.NUMBER,
                    default: '0'
                },
                E: {
                    type: type.ParameterType.NUMBER,
                    default: '0'
                },
                F: {
                    type: type.ParameterType.NUMBER,
                    default: '0'
                }
            },
            function: (args, util) => {
                try {
                    const canvas = this.canvasEngine.getDrawable();
                    const ctx = canvas.getContext('2d');
                    const a = Cast.toNumber(args.A);
                    const b = Cast.toNumber(args.B);
                    const c = Cast.toNumber(args.C);
                    const d = Cast.toNumber(args.D);
                    const e = Cast.toNumber(args.E);
                    const f = Cast.toNumber(args.F);
                    ctx.transform(a, b, c, d, e, f);
                } catch (e) {
                    console.error(e);
                }
            }
        });
        api.addBlock({
            opcode: 'alpha.canvas.clearTransform',
            type: type.BlockType.COMMAND,
            messageId: 'alpha.canvas.clearTransform',
            categoryId: 'alpha.canvas.category',
            function: (args, util) => {
                try {
                    const canvas = this.canvasEngine.getDrawable();
                    const ctx = canvas.getContext('2d');
                    ctx.setTransform(1, 0, 0, 1, 0, 0);
                } catch (e) {
                    console.error(e);
                }
            }
        });
        api.addBlock({
            opcode: 'alpha.canvas.save',
            type: type.BlockType.COMMAND,
            messageId: 'alpha.canvas.save',
            categoryId: 'alpha.canvas.category',
            function: (args, util) => {
                try {
                    const canvas = this.canvasEngine.getDrawable();
                    const ctx = canvas.getContext('2d');
                    ctx.save();
                } catch (e) {
                    console.error(e);
                }
            }
        });
        api.addBlock({
            opcode: 'alpha.canvas.restore',
            type: type.BlockType.COMMAND,
            messageId: 'alpha.canvas.restore',
            categoryId: 'alpha.canvas.category',
            function: (args, util) => {
                try {
                    const canvas = this.canvasEngine.getDrawable();
                    const ctx = canvas.getContext('2d');
                    ctx.restore();
                } catch (e) {
                    console.error(e);
                }
            }
        });
        api.addBlock({
            opcode: 'alpha.canvas.setGlobalAlpha',
            type: type.BlockType.COMMAND,
            messageId: 'alpha.canvas.setGlobalAlpha',
            categoryId: 'alpha.canvas.category',
            param: {
                ALPHA: {
                    type: type.ParameterType.NUMBER,
                    default: '1.0'
                }
            },
            function: (args, util) => {
                try {
                    const canvas = this.canvasEngine.getDrawable();
                    const ctx = canvas.getContext('2d');
                    const alpha = Cast.toNumber(args.ALPHA);
                    ctx.globalAlpha = alpha;
                } catch (e) {
                    console.error(e);
                }
            }
        });
        api.addBlock({
            opcode: 'alpha.canvas.setGlobalCompositeOperation',
            type: type.BlockType.COMMAND,
            messageId: 'alpha.canvas.setGlobalCompositeOperation',
            categoryId: 'alpha.canvas.category',
            param: {
                CompositeOperation: {
                    type: type.ParameterType.STRING,
                    default: 'source-over'
                }
            },
            function: (args, util) => {
                try {
                    const canvas = this.canvasEngine.getDrawable();
                    const ctx = canvas.getContext('2d');
                    ctx.globalCompositeOperation = args.CompositeOperation;
                } catch (e) {
                    console.error(e);
                }
            }
        });
        api.addBlock({
            opcode: 'alpha.canvas.switchCanvas',
            type: type.BlockType.COMMAND,
            messageId: 'alpha.canvas.switchCanvas',
            categoryId: 'alpha.canvas.category',
            param: {
                NUMBER: {
                    type: type.ParameterType.NUMBER,
                    default: '0'
                }
            },
            function: (args, util) => {
                try {
                    const canvas = this.canvasEngine.getDrawable();
                    const ctx = canvas.getContext('2d');
                    
                    this.canvasEngine.currentId = Cast.toNumber(args.NUMBER);
                } catch (e) {
                    console.error(e);
                }
            }
        });
        api.addBlock({
            opcode: 'alpha.canvas.lineTo',
            type: type.BlockType.COMMAND,
            messageId: 'alpha.canvas.lineTo',
            categoryId: 'alpha.canvas.category',
            param: {
                X: {
                    type: type.ParameterType.NUMBER,
                    default: '0'
                },
                Y: {
                    type: type.ParameterType.NUMBER,
                    default: '0'
                }
            },
            function: (args, util) => {
                try {
                    const canvas = this.canvasEngine.getDrawable();
                    const ctx = canvas.getContext('2d');
                    const x = Cast.toNumber(args.X);
                    const y = Cast.toNumber(args.Y);
                    ctx.lineTo(x, y);
                } catch (e) {
                    console.error(e);
                }
            }
        });
        api.addBlock({
            opcode: 'alpha.canvas.arc',
            type: type.BlockType.COMMAND,
            messageId: 'alpha.canvas.arc',
            categoryId: 'alpha.canvas.category',
            param: {
                X: {
                    type: type.ParameterType.NUMBER,
                    default: '0'
                },
                Y: {
                    type: type.ParameterType.NUMBER,
                    default: '0'
                },
                RADIUS: {
                    type: type.ParameterType.NUMBER,
                    default: '100'
                },
                START_ANGLE: {
                    type: type.ParameterType.NUMBER,
                    default: '00'
                },
                END_ANGLE: {
                    type: type.ParameterType.NUMBER,
                    default: '3.1415926'
                }
            },
            function: (args, util) => {
                try {
                    const canvas = this.canvasEngine.getDrawable();
                    const ctx = canvas.getContext('2d');
                    const x = Cast.toNumber(args.X);
                    const y = Cast.toNumber(args.Y);
                    const radius = Cast.toNumber(args.RADIUS);
                    const startAngle = Cast.toNumber(args.START_ANGLE);
                    const endAngle = Cast.toNumber(args.END_ANGLE);
                    ctx.arc(x, y, radius, startAngle, endAngle);
                } catch (e) {
                    console.error(e);
                }
            }
        });
        api.addBlock({
            opcode: 'alpha.canvas.rect',
            type: type.BlockType.COMMAND,
            messageId: 'alpha.canvas.rect',
            categoryId: 'alpha.canvas.category',
            param: {
                X: {
                    type: type.ParameterType.NUMBER,
                    default: '0'
                },
                Y: {
                    type: type.ParameterType.NUMBER,
                    default: '0'
                },
                W: {
                    type: type.ParameterType.NUMBER,
                    default: '100'
                },
                H: {
                    type: type.ParameterType.NUMBER,
                    default: '100'
                }
            },
            function: (args, util) => {
                try {
                    const canvas = this.canvasEngine.getDrawable();
                    const ctx = canvas.getContext('2d');
                    const x = Cast.toNumber(args.X);
                    const y = Cast.toNumber(args.Y);
                    const width = Cast.toNumber(args.W);
                    const height = Cast.toNumber(args.H);
                    ctx.rect(x, y, width, height);
                } catch (e) {
                    console.error(e);
                }
            }
        });
        api.addBlock({
            opcode: 'alpha.canvas.clip',
            type: type.BlockType.COMMAND,
            messageId: 'alpha.canvas.clip',
            categoryId: 'alpha.canvas.category',
            function: () => {
                try {
                    const canvas = this.canvasEngine.getDrawable();
                    const ctx = canvas.getContext('2d');
                    ctx.clip();

                } catch (e) {
                    console.error(e);
                }
            }
        });
        api.addBlock({
            opcode: 'alpha.canvas.fill',
            type: type.BlockType.COMMAND,
            messageId: 'alpha.canvas.fill',
            categoryId: 'alpha.canvas.category',
            function: () => {
                try {
                    const canvas = this.canvasEngine.getDrawable();
                    const ctx = canvas.getContext('2d');
                    ctx.fill();
                    
                } catch (e) {
                    console.error(e);
                }
            }
        });
        api.addBlock({
            opcode: 'alpha.canvas.stroke',
            type: type.BlockType.COMMAND,
            messageId: 'alpha.canvas.stroke',
            categoryId: 'alpha.canvas.category',
            function: () => {
                try {
                    const canvas = this.canvasEngine.getDrawable();
                    const ctx = canvas.getContext('2d');
                    ctx.stroke();

                } catch (e) {
                    console.error(e);
                }
            }
        });
        api.addBlock({
            opcode: 'alpha.canvas.stampOnStage',
            type: type.BlockType.COMMAND,
            messageId: 'alpha.canvas.stampOnStage',
            categoryId: 'alpha.canvas.category',
            function: () => {
                this.canvasEngine.stampOnStage();
            }
        });
    }

    onUninit () {
        api.removeCategory('alpha.canvas.category');
    }

    beforeProjectLoadExtension (data, extensions) {
        if (extensions.hasOwnProperty('canvas')) {
            console.log('Let\'s convert it!');
            delete extensions.canvas;
            for (const i in data) {
                let targetBlocks = data[i].blocks._blocks;
                console.log("处理角色（编号：" + i + "）中...", targetBlocks);
                for (let blockId in targetBlocks) {
                    if (targetBlocks[blockId].opcode.startsWith("canvas"))
                        targetBlocks[blockId].opcode = targetBlocks[blockId].opcode.replace("canvas_", "alpha.canvas.");
                }
                data[i].blocks._blocks = targetBlocks;
            }
        };
    }
}

module.exports = Canvas;
