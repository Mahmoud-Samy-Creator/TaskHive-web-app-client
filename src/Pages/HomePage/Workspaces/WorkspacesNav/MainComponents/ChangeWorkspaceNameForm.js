// ChangingWorkspaceName
export default function ChangeWorkspaceNameForm({workspaceName, changeHandler, changeInputHandler}) {
    return(
        <form className="workspace-name" onSubmit={(e) => {changeHandler(e)}}>
            <input
                type='text'
                placeholder={workspaceName}
                onChange={(e) => {changeInputHandler(e.target.value)}}/>
            <button type='submit'>Change</button>
        </form>
    )
}