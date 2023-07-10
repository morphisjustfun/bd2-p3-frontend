import {
    Button,
    Card,
    Container,
    Grid,
    Image,
    Spacer,
    Text,
    Modal,
    useInput,
    Input,
    Loading,
    Dropdown
} from "@nextui-org/react";
import {useCallback, useState, useRef} from "react";
import ModalCamera from "@/components/modal_camera";
import ImageBlock from "@/components/image_block";

const isNumeric = (str) => {
    if (typeof str != "string") return false // we only process strings!
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
        && Number.isInteger(parseFloat(str));
}

export default function Home() {
    const [imageSource, setImageSource] = useState(null);
    const [showTakePhotoDialog, setShowTakePhotoDialog] = useState(false);
    const {value: k, bindings: bindingsK} = useInput("");
    const [time, setTime] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectedMode, setSelectedMode] = useState(undefined);
    const [images, setImages] = useState([]);

    return (
        <>
            <ModalCamera setImageSource={setImageSource} showTakePhotoDialog={showTakePhotoDialog}
                         setShowTakePhotoDialog={setShowTakePhotoDialog}/>
            <div style={{
                marginTop: 20,
                marginLeft: 10,
                marginRight: 10,
            }}>
                <Grid.Container direction="column">
                    <Grid.Container direction="column" justify="center" alignItems="center">
                        <Text h1 css={{
                            textGradient: '45deg, $blue600 -20%, $pink600 50%',
                        }}> Database 2 - Project 3 </Text>
                        <Text h3> Convex Hull </Text>
                    </Grid.Container>
                    <Spacer y={1}/>
                    <Grid.Container direction="row" justify="center" alignItems="center">
                        <Grid.Container direction="row" justify="center" alignItems="center">
                            <Button color="gradient" onPress={() => {
                                const input = document.createElement('input');
                                input.type = 'file';
                                input.accept = '.jpg, .jpeg';
                                input.onchange = e => {
                                    const file = e.target.files[0];
                                    const reader = new FileReader();
                                    reader.readAsDataURL(file);
                                    reader.onload = () => {
                                        setImageSource(reader.result);
                                    };
                                };
                                input.click();
                            }}> Upload image </Button>
                            <Spacer x={2}/>
                            <Button color="gradient" onPress={() => {
                                setShowTakePhotoDialog(true);
                            }}> Take a photo </Button>
                            <Spacer x={2}/>
                            <Input {...bindingsK} placeholder="Enter k value" width={200} shadow inputMode="numeric"/>
                            <Spacer x={2}/>
                            <Dropdown>
                                <Dropdown.Button
                                    flat> {selectedMode !== undefined ? selectedMode : 'Select'} </Dropdown.Button>
                                <Dropdown.Menu>
                                    <Dropdown.Item>
                                        <div onClick={async () => {
                                            setSelectedMode("Sequential KNN");
                                        }}>
                                            Sequential KNN
                                        </div>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <div onClick={async () => {
                                            setSelectedMode("RTree KNN");
                                        }}>
                                            RTree KNN
                                        </div>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <div onClick={async () => {
                                            setSelectedMode("KDTree KNN");
                                        }}>
                                            KDTree KNN
                                        </div>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Spacer x={2}/>
                            <Button color="gradient" onPress={async () => {
                                const myHeaders = new Headers();
                                myHeaders.append("Authorization", "Basic YWRtaW46MTIzcXdl");

                                const formdata = new FormData();
                                if (selectedMode === "Sequential KNN") {
                                    const blob = await (await fetch(imageSource)).blob();
                                    formdata.append("image", blob, "image.jpeg");
                                    formdata.append("k", "6");
                                    formdata.append("distance_metric", "euclidean");
                                } else {
                                    const blob = await (await fetch(imageSource)).blob();
                                    formdata.append("image", blob, "image.jpeg");
                                    formdata.append("k", "6");
                                }

                                var requestOptions = {
                                    method: 'POST',
                                    headers: myHeaders,
                                    body: formdata,
                                    redirect: 'follow'
                                };

                                setLoading(true);
                                try {
                                    if (selectedMode === "Sequential KNN") {
                                        const response = await fetch("http://129.146.71.229:8000/secuential_knn/", requestOptions);
                                        const data = await response.json();
                                        setTime(data.execution_time);
                                        setImages(data.k_nearest_neighbors.map((e) => e.path));
                                    }
                                    if (selectedMode === "RTree KNN") {
                                        const response = await fetch("http://129.146.71.229:8000/rtree_knn/", requestOptions);
                                        const data = await response.json();
                                        setTime(data.execution_time);
                                        setImages(data.k_nearest_neighbors.map((e) => e.path));
                                    }
                                    if (selectedMode === "KDTree KNN") {
                                        const response = await fetch("http://129.146.71.229:8000/kdtree_knn/", requestOptions);
                                        const data = await response.json();
                                        setTime(data.execution_time);
                                        setImages(data.k_nearest_neighbors.map((e) => e.path));
                                    }
                                } finally {
                                    setLoading(false);
                                }


                            }} disabled={
                                imageSource === null || k === "" || !isNumeric(k) || selectedMode === undefined
                            }> Send </Button>
                        </Grid.Container>
                    </Grid.Container>
                    <Spacer y={2}/>
                    <Image
                        src={imageSource ?? "https://www.pacifictrellisfruit.com/wp-content/uploads/2016/04/default-placeholder-300x300.png"}
                        width={250} height={250}
                        alt="Image"
                        // strictly 300x300
                        objectFit="cover"
                        css={{
                            borderRadius: 20,
                        }}
                    />
                    {loading && <Container css={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Spacer y={12}/>
                        <Loading size="lg"/>
                    </Container>}
                    {time !== 0 &&
                        <>
                            <Spacer y={4}/>
                            <Container css={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                            }}>
                                <Text h2 css={{
                                    textGradient: '90deg, $blue600 -20%, $pink600 50%',
                                }}> Execution time: {time} seconds </Text>
                            </Container>
                            <Spacer y={1}/>
                            <Grid.Container direction="row" justify="center" alignItems="center">
                                {
                                    images.map((e, index) => {
                                        return (
                                            <Grid key={index}>
                                                <ImageBlock imageUrl={e}/>
                                            </Grid>
                                        )
                                    })
                                }

                            </Grid.Container>
                        </>
                    }
                </Grid.Container>
            </div>
        </>
    );
}