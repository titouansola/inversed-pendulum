export function Instructions() {
    return <div className={'instructions-container'}>
        <h2>Instructions</h2>
        <p>Try to keep the pendulum up as long as you can! Time will stop when you lose.</p>
        <div className="instructions">
            <p>
                Arrows <b>Left</b> and <b>Right</b> : Apply force to pendulum
            </p>
            <p>
                <b>Space</b> : Reset
            </p>
            <p>
                <b>Escape</b> : Open options
            </p>
        </div>
        <p className={'bottom-line'}>Made with 💜 by <a href={'https://titouansola.dev'}>Titouan Sola</a></p>
    </div>
}
