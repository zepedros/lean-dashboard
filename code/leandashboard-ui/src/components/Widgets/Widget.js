export default function Widget(){
    const [widget, setWidget] = useState([])
    const [refresh, setRefreshWidgets] = useState(false)
    const { get, post, response, loading, error } = useFetch('http://localhost:3000/api', { cachePolicy: "no-cache", credentials: "same-origin" })

    useEffect(() => {
        loadWidgets().then(() => {
            console.log(response.data)
        })
    }, [refresh])

    function doRefresh() {
        setRefreshProjects(!refresh)
    }

    async function loadWidgets() {
        const getWidget = await get(`/api/lean/projects/${id}/dashboard/${dashboardId}/widgets/${widgetId}`)
        if(getWidgets) {
                setWidget(getWidget)
            }
     }
}
