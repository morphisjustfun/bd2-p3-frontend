import {Button, Card, Container, Grid, Image, Spacer, Text, Modal} from "@nextui-org/react";
import {useCallback, useState, useRef} from "react";
import ModalCamera from "@/components/modal_camera";

export default function Home() {
    const [imageSource, setImageSource] = useState(null);
    const [showTakePhotoDialog, setShowTakePhotoDialog] = useState(false);

    console.log(imageSource);
    return (
        <>
            <ModalCamera setImageSource={setImageSource} showTakePhotoDialog={showTakePhotoDialog}
                         setShowTakePhotoDialog={setShowTakePhotoDialog}/>
            <Container fluid css={{
                marginTop: 20,
                marginLeft: 10,
                marginRight: 10,
            }}>
                <Grid.Container direction="column" justify="center" alignItems="center">
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
                        </Grid.Container>
                    </Grid.Container>
                    <Spacer y={2}/>
                    <Image
                        src={imageSource ?? "https://www.pacifictrellisfruit.com/wp-content/uploads/2016/04/default-placeholder-300x300.png"}
                        width={300} height={300}
                        alt="Image"
                        // strictly 300x300
                        objectFit="cover"
                        css={{
                            borderRadius: 20,
                        }}
                    />
                    {/*<Webcam height={300} width={300} ref={webcamRef}/>*/}
                </Grid.Container>
            </Container>
        </>
    );
}