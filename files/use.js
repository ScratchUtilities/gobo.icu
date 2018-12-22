function fromB64(value) {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";
    num = 0;
    track = 0;
    while (track<value.length) {
	num = (num << 6) | chars.indexOf(value[track]);
	track ++;
    }
    return num;
}
