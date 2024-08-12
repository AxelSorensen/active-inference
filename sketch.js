let Q_x = [];
let P_y_x = [];
let numPts = 1000;

const gaussianPDF = (x, mean, stddev) => (1 / (stddev * Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * Math.pow((x - mean) / stddev, 2)));
function setup() {
    createCanvas(400, 400);
    Q_x_mean_text = createElement('p', '')
    Q_x_mean_slider = createSlider(-5, 5, 0, 0.1)
    P_y_x_mean_text = createElement('p', '')
    P_y_x_mean_slider = createSlider(-5, 5, 0, 0.1)
    Q_x_std_text = createElement('p', '')
    Q_x_std_slider = createSlider(0, 5, 1, 0.1)
    P_y_x_std_text = createElement('p', '')

    P_y_x_std_slider = createSlider(0, 5, 1, 0.1)

}

function integrate(array) {

    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        dx = 1 / array.length
        sum += array[i] * dx;
    }
    return sum;
}

function draw() {

    stroke(0)
    background(255);
    text('Variational Free Energy', 50, 50);
    translate(0, height - height / 2);

    Q_x = []
    P_y_x = []
    Energy = []
    Entropy =
        drawLines();
    scale(1, -1);
    Q_x_mean_text.html('Q(x) mean: ' + Q_x_mean_slider.value())
    P_y_x_mean_text.html('P(x,y) mean: ' + P_y_x_mean_slider.value())
    Q_x_std_text.html('Q(x) std: ' + Q_x_std_slider.value())
    P_y_x_std_text.html('P(x,y) std: ' + P_y_x_std_slider.value())
    text('Free Energy: ' + calculateFreeEnergy(), 20, 100)
    //   drawEllipses();
}


function calculateFreeEnergy() {
    let first_term = Energy.reduce((a, b) => a + b, 0)
    let second_term = calculateEntropy(Q_x)
    return -first_term - second_term
}

function calculateEnergy() {
    for (let i = 0; i < Q_x.length; i++) {
        Energy.push((Q_x[i] * Math.log(P_y_x[i])));
    }
}

function calculateEntropy(probabilities) {
    return probabilities.reduce((entropy, p) => {
        return p > 0 ? entropy - p * Math.log2(p) : entropy;
    }, 0);
}



function drawLines() {
    scale(1, -1);
    for (let i = -5; i < 5; i += 10 / numPts) {
        Q_x.push((gaussianPDF(i, Q_x_mean_slider.value(), Q_x_std_slider.value())));
    }
    for (let i = -5; i < 5; i += 10 / numPts) {
        P_y_x.push((gaussianPDF(i, P_y_x_mean_slider.value(), P_y_x_std_slider.value())));
    }

    calculateEnergy()
    stroke('red');
    // draw lines
    let px = 0;
    let py = Q_x[0];
    for (let i = 0; i < Q_x.length; i++) {
        let x = i * (width / (numPts - 1));
        let y = Q_x[i] * height / 2;
        line(px, py, x, y);

        //store the last position
        px = x;
        py = y;
    }
    stroke('green');
    let px1 = 0;
    let py1 = P_y_x[0];
    for (let i = 0; i < P_y_x.length; i++) {
        let x = i * (width / (numPts - 1));
        let y = P_y_x[i] * height / 2;
        line(px1, py1, x, y);

        //store the last position
        px1 = x;
        py1 = y;
    }
    stroke('blue');
    let px2 = 0;
    let py2 = P_y_x[0];
    for (let i = 0; i < Energy.length; i++) {
        let x = i * (width / (numPts - 1));
        let y = Energy[i] * height / 2;
        line(px2, py2, x, y);

        //store the last position
        px2 = x;
        py2 = y;
    }
}