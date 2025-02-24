interface BtnProps {
	BtnTitle: string
}

export default function Modal({ BtnTitle }: BtnProps) {
	return (
		<div>
			{/* Open the modal using document.getElementById('ID').showModal() method */}
			<button
				className="py-2 px-4 bg-gray-700 text-white rounded-xl"
				onClick={() =>
					(
						document.getElementById(
							'my_modal_1'
						) as HTMLDialogElement
					).showModal()
				}
			>
				{BtnTitle}
			</button>
			<dialog id="my_modal_1" className="p-4 rounded-xl">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Hello!</h3>
					<p className="py-4">
						Press ESC key or click the button below to close
					</p>
					<div className="modal-action">
						<form method="dialog">
							<button className="py-2 px-4 bg-gray-700 text-white rounded-xl">
								Cancelar
							</button>
						</form>
					</div>
				</div>
			</dialog>
		</div>
	)
}
