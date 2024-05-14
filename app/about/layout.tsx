const layout = ({ children }: { children: any }) => {
    return (
        <div
            className="grid h-screen grid-cols-2 grid-rows-3"
        >
            <div className="col-span-2 text-center uppercase text-xl bg-blue-400 content-center">Header</div>
            <div className="col-span-2 text-center uppercase text-xl content-center">{children}</div>
            <div className="col-span-2 text-center uppercase text-xl bg-blue-400 content-center">Footer</div>
        </div>
    )
}

export default layout